import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { Kabupaten } from 'src/app/model/kabupatenModel';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wilayah-kabupaten',
  templateUrl: './wilayah-kabupaten.component.html',
  styleUrls: ['./wilayah-kabupaten.component.css'],
})
export class WilayahKabupatenComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private title: Title,
    private route: ActivatedRoute,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.getKabupaten();
    console.log(this.nik);
    this.title.setTitle('Kabupaten');
  }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    observe: 'response',
    responseType: 'json',
  };

  displayedColumns = [
    'no',
    'cityId',
    'cityName',
    'provinceName',
    'countryNameIdn',
    'action',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  searchData: any;
  dataSearchKabupaten: any;
  dataKabupaten: Kabupaten[] = [];
  dataSource!: MatTableDataSource<Kabupaten>;
  pageEvent!: PageEvent;
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;
  nik: any;
  token: any;

  getKabupaten() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.isLoading = true;
    this.error = false;
    this.dataKabupaten = [];
    this.dataSource = new MatTableDataSource(this.dataKabupaten);
    this.wilayahService
      .getAllc(
        'city/?sort=cityName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataKabupaten.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              cityId: element.cityId,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataKabupaten);
        },
        (error) => {
          console.log(error);
          this.statusText = error.statusText;
          this.isLoading = false;
          this.error = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }

  handlePageEvent(e: PageEvent) {
    this.noData = false;
    this.error = false;
    this.isLoading = true;
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    console.log(this.pageEvent);

    // * getKabupaten
    this.dataKabupaten = [];
    this.dataSource = new MatTableDataSource(this.dataKabupaten);

    if (this.searchData == null) {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.wilayahService
        .getAllc(
          'city/?sort=cityName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize,
          this.httpOptions,
          catchError(this.handleError.handleErrorDetailUser.bind(this))
        )
        .subscribe(
          (res) => {
            this.pageEvent = e;
            this.pageSize = e.pageSize;
            this.pageIndex = e.pageIndex;
            this.totalRec = res.body.paging.totalrecord;
            res.body.result.forEach((element: any, index: any) => {
              this.dataKabupaten.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                cityId: element.cityId,
                cityName: element.cityName,
                provinceName: element.provinceName,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataKabupaten);
          },
          (error) => {
            // console.log(error);
            this.isLoading = false;
            this.error = true;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,

              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: 'Service Unavailable',
            });
          }
        );
    } else {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.dataSearchKabupaten = [];
      this.wilayahService
        .getAllc(
          'city/?cityId.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=cityName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize,
          this.httpOptions,
          catchError(this.handleError.handleErrorDetailUser.bind(this))
        )
        .subscribe(
          (res) => {
            this.totalRec = res.body.paging.totalrecord;
            res.body.result.forEach((element: any, index: any) => {
              this.dataSearchKabupaten.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                cityId: element.cityId,
                cityName: element.cityName,
                provinceName: element.provinceName,
                countryNameIdn: element.countryNameIdn,
              });
            });

            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataSearchKabupaten);
          },
          (error) => {
            // console.log(error);
            this.isLoading = false;
            this.error = true;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,

              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: 'Service Unavailable',
            });
          }
        );
    }
  }

  searchKabupaten() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.error = false;
    this.isLoading = true;
    this.pageIndex = 0;
    this.dataSearchKabupaten = [];
    this.wilayahService
      .getAllc(
        'city/?cityId.contains=' +
          this.searchData +
          '&cityName.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=cityName,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchKabupaten.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              cityId: element.cityId,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.noData = true;
          this.dataSource = new MatTableDataSource(this.dataSearchKabupaten);
        },
        (error) => {
          // console.log(error);
          this.isLoading = false;
          this.error = true;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,

            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }

  onSearchChange() {
    this.noData = false;
    if (this.searchData === '') {
      this.searchKabupaten();
    } else {
    }
  }

  deleteKabupaten(dataKabupaten: any) {
    let kabupatenId = dataKabupaten.cityId;
    let nik = this.nik;
    this.noData = false;
    console.log(kabupatenId);
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Apakah kamu yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Tidak',
    }).then((res) => {
      if (res.isConfirmed) {
        this.httpOptions.headers = this.httpHeaders.set(
          'Authorization',
          `Bearer ${this.token}`
        );
        this.wilayahService
          .deleteAllc(
            'city/' + kabupatenId + '/' + nik,
            this.httpOptions,
            catchError(this.handleError.handleErrorDetailUser.bind(this))
          )
          .subscribe(
            (res) => {
              console.log(res);
              let statusCode = res.body.status.responseCode;
              let statusDesc = res.body.status.responseDesc;
              if (statusCode == '200') {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: statusDesc,
                  showConfirmButton: false,
                  timer: 1500,
                }).then((res) => {
                  if (res) this.getKabupaten();
                });
              } else {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: statusDesc,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            },
            (error) => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Service Unavailable',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          );
      }
    });
  }
}
