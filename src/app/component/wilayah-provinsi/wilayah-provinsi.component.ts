import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Provinsi } from 'src/app/model/provinsiModel';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wilayah-provinsi',
  templateUrl: './wilayah-provinsi.component.html',
  styleUrls: ['./wilayah-provinsi.component.css'],
})
export class WilayahProvinsiComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.getProvince();
    console.log(this.nik);
    this.title.setTitle('Provinsi');
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
    'id',
    'provinceId',
    'provinceName',
    'countryNameIdn',
    // 'status',
    'action',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  dataProvinsi: Provinsi[] = [];
  dataSource!: MatTableDataSource<Provinsi>;
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchProvinsi: Provinsi[] = [];
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;
  nik: any;
  status: string = '';

  token: any;

  @ViewChild('paginator')
  paginator!: MatPaginator;

  @ViewChild('sort')
  sort!: MatSort;

  getProvince() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.isLoading = true;
    this.error = false;
    this.dataProvinsi = [];
    this.dataSource = new MatTableDataSource(this.dataProvinsi);
    this.wilayahService
      .getAllc(
        'province/?sort=provinceName,asc&page=' +
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
            if (element.flag === false) {
              this.status = 'ACTIVE';
            } else if (element.flag === true) {
              this.status = 'NON - ACTIVE';
            } else {
              this.status = 'UNKNOWN';
            }
            this.dataProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
              // status: this.status,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataProvinsi);
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
    // * getProvince
    this.dataProvinsi = [];
    this.dataSource = new MatTableDataSource(this.dataProvinsi);
    if (this.searchData != null) {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.dataSearchProvinsi = [];
      this.wilayahService
        .getAllc(
          'province/??provinceId.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=provinceName,asc&page=' +
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
              if (element.flag === false) {
                this.status = 'ACTIVE';
              } else if (element.flag === true) {
                this.status = 'NON - ACTIVE';
              } else {
                this.status = 'UNKNOWN';
              }
              this.dataSearchProvinsi.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
                // status: this.status,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
          },
          (error) => {
            console.log(error);
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
      this.wilayahService
        .getAllc(
          'province/?sort=provinceName,asc&page=' +
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
              if (element.flag === false) {
                this.status = 'ACTIVE';
              } else if (element.flag === true) {
                this.status = 'NON - ACTIVE';
              } else {
                this.status = 'UNKNOWN';
              }
              this.dataProvinsi.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryNameIdn: element.countryNameIdn,
                countryId: element.countryId,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
                // status: this.status,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataProvinsi);
          },
          (error) => {
            console.log(error);
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

  searchProvinsi() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.error = false;
    this.isLoading = true;
    this.pageIndex = 0;
    this.dataSearchProvinsi = [];
    this.wilayahService
      .getAllc(
        'province/??provinceId.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&sort=provinceName,asc&page=' +
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
            if (element.flag === false) {
              this.status = 'ACTIVE';
            } else if (element.flag === true) {
              this.status = 'NON - ACTIVE';
            } else {
              this.status = 'UNKNOWN';
            }
            this.dataSearchProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
              // status: this.status,
            });
          });
          this.isLoading = false;
          this.noData = true;
          this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
        },
        (error) => {
          console.log(error);
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
      this.searchProvinsi();
    } else {
    }
  }

  deleteProvinsi(dataProvinsi: any) {
    this.noData = false;
    let nik = this.nik;
    let provinceId = dataProvinsi.provinceId;
    console.log(provinceId);
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
            'province/' + provinceId + '/' + nik,
            this.httpOptions,
            catchError(this.handleError.handleErrorDetailUser.bind(this))
          )
          .subscribe(
            (res) => {
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
                  if (res) this.getProvince();
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
