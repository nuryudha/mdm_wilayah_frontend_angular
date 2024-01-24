import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wilayah-negara',
  templateUrl: './wilayah-negara.component.html',
  styleUrls: ['./wilayah-negara.component.css'],
})
export class WilayahNegaraComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private title: Title,
    private route: ActivatedRoute,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.getCountry();
    this.title.setTitle('Negara');
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

  displayedColumns: string[] = ['id', 'countryId', 'countryNameIdn', 'action'];
  dataSource!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  searchData: any;
  dataSearchNegara: Negara[] = [];
  pageEvent!: PageEvent;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;

  token: any;

  getCountry() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.isLoading = true;
    this.error = false;
    console.log(this.pageIndex);
    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);
    this.wilayahService
      .getAllc(
        'country/?sort=countryNameIdn,asc&page=' +
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
            this.dataNegara.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataNegara);
        },
        (error) => {
          // console.log(error);
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
    console.log(this.pageSize);
    console.log(this.pageIndex);

    this.dataNegara = [];
    this.dataSource = new MatTableDataSource(this.dataNegara);

    if (this.searchData == null) {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.wilayahService
        .getAllc(
          'country/?sort=countryNameIdn,asc&page=' +
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
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            console.log(this.totalRec);
            res.body.result.forEach((element: any, index: any) => {
              this.dataNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataNegara);
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
      this.dataSearchNegara = [];
      this.wilayahService
        .getAllc(
          'country/?countryNameIdn.contains=' +
            this.searchData +
            '&countryId.contains=' +
            this.searchData +
            '&sort=countryNameIdn,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize,
          this.httpOptions,
          catchError(this.handleError.handleErrorDetailUser.bind(this))
        )
        .subscribe(
          (res) => {
            console.log(res);
            this.totalRec = res.body.paging.totalrecord;
            res.body.result.forEach((element: any, index: any) => {
              this.dataSearchNegara.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataSearchNegara);
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

  searchNegara() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.error = false;
    this.isLoading = true;
    this.dataSearchNegara = [];
    this.pageIndex = 0;
    this.wilayahService
      .getAllc(
        'country/?countryNameIdn.contains=' +
          this.searchData +
          '&countryId.contains=' +
          this.searchData +
          '&sort=countryNameIdn,asc&page=' +
          this.pageIndex +
          '&size=' +
          this.pageSize,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataSearchNegara.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.noData = true;
          this.dataSource = new MatTableDataSource(this.dataSearchNegara);
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
      this.searchNegara();
    } else {
    }
  }

  deleteNegara(dataCountry: any) {
    this.noData = false;
    let idCountry = dataCountry.countryId;
    console.log(idCountry);
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: 'Apakah kamu yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Tidak',
    }).then((result) => {
      if (result.isConfirmed) {
        this.httpOptions.headers = this.httpHeaders.set(
          'Authorization',
          `Bearer ${this.token}`
        );
        this.wilayahService
          .deleteAllc(
            'country/' + idCountry,
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
                  if (res) this.getCountry();
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
