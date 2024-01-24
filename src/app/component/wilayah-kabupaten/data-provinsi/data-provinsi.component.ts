import { Component, OnInit } from '@angular/core';

import { DataProvinsi } from 'src/app/model/provinsiModel';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data-provinsi',
  templateUrl: './data-provinsi.component.html',
  styleUrls: ['./data-provinsi.component.css'],
})
export class DataProvinsiComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DataProvinsiComponent>,
    private wilayahService: WilayahService,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  ngOnInit(): void {
    this.getProvince();
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

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

  displayedColumns = ['provinceId', 'provinceName', 'countryNameIdn'];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  dataProvinsi: DataProvinsi[] = [];
  dataSource!: MatTableDataSource<DataProvinsi>;
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchProvinsi: any;
  isLoading = false;
  error = false;
  statusText: any;
  noData = false;
  token: any;
  nik: any;

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
            this.dataProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
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
              this.dataSearchProvinsi.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
          },
          (error) => {
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
              this.dataProvinsi.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                countryNameIdn: element.countryNameIdn,
                countryId: element.countryId,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataProvinsi);
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

  searchProvinsi() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.isLoading = true;
    this.noData = false;
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
            this.dataSearchProvinsi.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
            });
          });
          this.isLoading = false;
          this.noData = true;
          this.dataSource = new MatTableDataSource(this.dataSearchProvinsi);
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
      this.searchProvinsi();
    } else {
    }
  }

  chooseCell(dataProvinsi: any) {
    this.dialogRef.close(dataProvinsi);
  }
}
