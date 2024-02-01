import { Component, OnInit } from '@angular/core';

import { DataKabupaten } from 'src/app/model/kabupatenModel';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data-kabupaten',
  templateUrl: './data-kabupaten.component.html',
  styleUrls: ['./data-kabupaten.component.css'],
})
export class DataKabupatenComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    public dialogRef: MatDialogRef<DataKabupatenComponent>,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  ngOnInit(): void {
    this.getKabupaten();
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

  displayedColumns = ['cityId', 'cityName', 'provinceName', 'countryNameIdn'];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  dataKabupaten: DataKabupaten[] = [];
  dataSource!: MatTableDataSource<DataKabupaten>;
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchKabupaten: any;
  isLoading = false;
  error = false;
  statusText: any;
  noData = false;
  token: any;
  nik: any;
  getKabupaten() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.noData = false;
    this.error = false;
    this.isLoading = true;
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
          console.log(res);
          this.totalRec = res.body.paging.totalrecord;
          res.body.result.forEach((element: any, index: any) => {
            this.dataKabupaten.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              cityId: element.cityId,
              cityName: element.cityName,
              provinceName: element.provinceName,
              countryNameIdn: element.countryNameIdn,
              countryId: element.countryId,
              provinceId: element.provinceId,
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
                countryId: element.countryId,
                provinceId: element.provinceId,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataKabupaten);
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
      this.noData = true;
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
                countryId: element.countryId,
                provinceId: element.provinceId,
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

  chooseCell(dataKabupaten: any) {
    this.dialogRef.close(dataKabupaten);
    console.log(dataKabupaten);
  }

  refreshPage() {
    location.reload();
  }
}
