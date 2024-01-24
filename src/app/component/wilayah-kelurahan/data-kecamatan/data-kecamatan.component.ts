import { Component, OnInit } from '@angular/core';

import { DataKecamatan } from 'src/app/model/kecamatanModel';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data-kecamatan',
  templateUrl: './data-kecamatan.component.html',
  styleUrls: ['./data-kecamatan.component.css'],
})
export class DataKecamatanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    public dialogRef: MatDialogRef<DataKecamatanComponent>,
    private handleError: ErrorRequestService
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  ngOnInit(): void {
    this.getKecamatan();
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

  displayedColumns = [
    'districtId',
    'districtName',
    'cityName',
    'provinceName',
    'countryNameIdn',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  pageEvent!: PageEvent;
  searchData: any;
  dataSearchKecamatan: any;
  dataSource!: MatTableDataSource<DataKecamatan>;
  dataKecamatan: DataKecamatan[] = [];
  isLoading = false;
  error = false;
  statusText: any;
  noData = false;
  token: any;
  nik: any;

  getKecamatan() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.isLoading = true;
    this.error = false;
    this.dataKecamatan = [];
    this.dataSource = new MatTableDataSource(this.dataKecamatan);
    this.wilayahService
      .getAllc(
        'district/?sort=districtName,asc&page=' +
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
            this.dataKecamatan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              districtId: element.districtId,
              districtName: element.districtName,
              cityId: element.cityId,
              cityName: element.cityName,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.error = false;
          this.dataSource = new MatTableDataSource(this.dataKecamatan);
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
    // * getKecamatan
    this.dataKecamatan = [];
    if (this.searchData == null) {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.wilayahService
        .getAllc(
          'district/?sort=districtName,asc&page=' +
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
              this.dataKecamatan.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                districtId: element.districtId,
                districtName: element.districtName,
                cityId: element.cityId,
                cityName: element.cityName,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataKecamatan);
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
      this.isLoading = false;
      this.noData = true;
      this.dataSearchKecamatan = [];
      this.wilayahService
        .getAllc(
          'district/?district.contains=' +
            this.searchData +
            '&districtName.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&page=' +
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
              this.dataSearchKecamatan.push({
                no: this.pageIndex * this.pageSize + index + 1 + '.',
                districtId: element.districtId,
                districtName: element.districtName,
                cityId: element.cityId,
                cityName: element.cityName,
                provinceId: element.provinceId,
                provinceName: element.provinceName,
                countryId: element.countryId,
                countryNameIdn: element.countryNameIdn,
              });
            });
            this.isLoading = false;
            this.dataSource = new MatTableDataSource(this.dataSearchKecamatan);
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
    this.dataSearchKecamatan = [];
    this.wilayahService
      .getAllc(
        'district/?district.contains=' +
          this.searchData +
          '&districtName.contains=' +
          this.searchData +
          '&cityName.contains=' +
          this.searchData +
          '&provinceName.contains=' +
          this.searchData +
          '&countryNameIdn.contains=' +
          this.searchData +
          '&page=' +
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
            this.dataSearchKecamatan.push({
              no: this.pageIndex * this.pageSize + index + 1 + '.',
              districtId: element.districtId,
              districtName: element.districtName,
              cityId: element.cityId,
              cityName: element.cityName,
              provinceId: element.provinceId,
              provinceName: element.provinceName,
              countryId: element.countryId,
              countryNameIdn: element.countryNameIdn,
            });
          });
          this.isLoading = false;
          this.noData = true;
          this.dataSource = new MatTableDataSource(this.dataSearchKecamatan);
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

  chooseCell(dataKecamatan: any) {
    // console.log(dataKecamatan);
    this.dialogRef.close(dataKecamatan);
  }
}
