import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { HttpHeaders } from '@angular/common/http';
import { Keluarahan } from 'src/app/model/kelurahanModel';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wilayah-kelurahan',
  templateUrl: './wilayah-kelurahan.component.html',
  styleUrls: ['./wilayah-kelurahan.component.css'],
})
export class WilayahKelurahanComponent implements OnInit {
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
    'no',
    'villageId',
    'villageName',
    'villagePostalCode',
    'districtName',
    'cityName',
    'provinceName',
    'countryNameIdn',
    'status',
    'action',
  ];
  totalRec: any;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [10, 20, 100];
  pageEvent!: PageEvent;
  searchData: any;
  dataKeluarahan: Keluarahan[] = [];
  dataSource!: MatTableDataSource<Keluarahan>;
  dataSearchKeluarahan: any;
  isLoading = true;
  error = false;
  statusText: any;
  noData = false;
  nik: any;
  token: any;
  status: string = '';
  formValidasi!: FormGroup;
  url: any;
  flag: boolean | undefined;

  constructor(
    private wilayahService: WilayahService,
    private title: Title,
    private route: ActivatedRoute,
    private handleError: ErrorRequestService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  async ngOnInit(): Promise<void> {
    this.cekValidasi();
    await this.getKelurahanByStatus(this.status);
    this.title.setTitle('Kelurahan');
  }

  async getKelurahan(url?: any): Promise<void> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );

    this.noData = false;
    this.isLoading = true;
    this.error = false;

    this.dataKeluarahan = [];
    this.dataSource = new MatTableDataSource(this.dataKeluarahan);

    try {
      const res = await this.wilayahService
        .getAllc(
          url,
          this.httpOptions,
          catchError(this.handleError.handleErrorDetailUser.bind(this))
        )
        .toPromise();
      this.totalRec = res.body.paging.totalrecord;
      res.body.result.forEach((element: any, index: any) => {
        if (element.flag === false) {
          this.status = 'AKTIF';
        } else if (element.flag === true) {
          this.status = 'TIDAK AKTIF';
        } else {
          this.status = 'ERROR';
        }
        this.dataKeluarahan.push({
          no: this.pageIndex * this.pageSize + index + 1 + '.',
          villageId: element.villageId,
          villageName: element.villageName,
          villagePostalCode: element.villagePostalCode,
          districtName: element.districtName,
          cityName: element.cityName,
          provinceName: element.provinceName,
          countryNameIdn: element.countryNameIdn,
          status: this.status,
        });
      });
      this.isLoading = false;
      this.error = false;
      this.dataSource = new MatTableDataSource(this.dataKeluarahan);
    } catch (err) {
      this.handleErrorGetkelurahan(err);
    }
    // this.wilayahService
    //   .getAllc(
    //     url,
    //     this.httpOptions,
    //     catchError(this.handleError.handleErrorDetailUser.bind(this))
    //   )
    //   .subscribe(
    //     (res) => {
    //       this.totalRec = res.body.paging.totalrecord;
    //       res.body.result.forEach((element: any, index: any) => {
    //         if (element.flag === false) {
    //           this.status = 'AKTIF';
    //         } else if (element.flag === true) {
    //           this.status = 'TIDAK AKTIF';
    //         } else {
    //           this.status = 'ERROR';
    //         }
    //         this.dataKeluarahan.push({
    //           no: this.pageIndex * this.pageSize + index + 1 + '.',
    //           villageId: element.villageId,
    //           villageName: element.villageName,
    //           villagePostalCode: element.villagePostalCode,
    //           districtName: element.districtName,
    //           cityName: element.cityName,
    //           provinceName: element.provinceName,
    //           countryNameIdn: element.countryNameIdn,
    //           status: this.status,
    //         });
    //       });
    //       this.isLoading = false;
    //       this.error = false;
    //       this.dataSource = new MatTableDataSource(this.dataKeluarahan);
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.statusText = error.statusText;
    //       this.isLoading = false;
    //       this.error = true;
    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 3000,

    //         didOpen: (toast) => {
    //           toast.addEventListener('mouseenter', Swal.stopTimer);
    //           toast.addEventListener('mouseleave', Swal.resumeTimer);
    //         },
    //       });

    //       Toast.fire({
    //         icon: 'error',
    //         title: 'Service Unavailable',
    //       });
    // }
    // );
  }

  private handleErrorGetkelurahan(err: any) {
    this.isLoading = false;
    this.error = true;
    console.error(err);

    this.statusText = err.statusText || 'Service Unavailable';

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
      title: this.statusText,
    });
  }

  async getKelurahanByStatus(event: any): Promise<void> {
    const selectedValue = event.value;

    if (selectedValue === 'aktif') {
      this.flag = false;
    } else if (selectedValue === 'tidak aktif') {
      this.flag = true;
    } else if (selectedValue === 'all') {
      this.flag = undefined;
    }

    this.url = this.buildUrlWithFlag(this.flag);
    await this.getKelurahan(this.url);
  }

  async handlePageEvent(e: PageEvent): Promise<void> {
    this.noData = false;
    this.error = false;
    this.isLoading = true;

    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.dataKeluarahan = [];
    this.dataSource = new MatTableDataSource(this.dataKeluarahan);

    if (this.flag === undefined) {
      this.url = `village/?sort=villageName,asc&page=${this.pageIndex}&size=${this.pageSize}`;
    } else {
      this.url = `village/?sort=villageName,asc&page=${this.pageIndex}&size=${this.pageSize}&flag.equals=${this.flag}`;
    }

    if (this.searchData == null || '' || undefined) {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );

      try {
        const res = await this.wilayahService
          .getAllc(
            this.url,
            this.httpOptions,
            catchError(this.handleError.handleErrorDetailUser.bind(this))
          )
          .toPromise();
        this.pageEvent = e;
        this.pageSize = e.pageSize;
        this.pageIndex = e.pageIndex;
        this.totalRec = res.body.paging.totalrecord;

        res.body.result.forEach((element: any, index: any) => {
          if (element.flag === false) {
            this.status = 'AKTIF';
          } else if (element.flag === true) {
            this.status = 'TIDAK AKTIF';
          } else {
            this.status = 'ERROR';
          }
          this.dataKeluarahan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            villageId: element.villageId,
            villageName: element.villageName,
            villagePostalCode: element.villagePostalCode,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
            status: this.status,
          });
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.dataKeluarahan);
      } catch (error) {
        let errorMessage = 'Unexpected error occurred';

        if (typeof error === 'object' && error !== null) {
          const responseError = error as { response?: { status: number } };
          if (responseError.response?.status === 500) {
            errorMessage = 'Internal Server Error';
          }
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
      }

      // this.wilayahService
      //   .getAllc(
      //     this.url,
      //     this.httpOptions,
      //     catchError(this.handleError.handleErrorDetailUser.bind(this))
      //   )
      //   .subscribe(
      //     (res) => {
      //       this.pageEvent = e;
      //       this.pageSize = e.pageSize;
      //       this.pageIndex = e.pageIndex;
      //       this.totalRec = res.body.paging.totalrecord;
      //       console.log(res.body.paging.totalrecord);

      //       res.body.result.forEach((element: any, index: any) => {
      //         if (element.flag === false) {
      //           this.status = 'AKTIF';
      //         } else if (element.flag === true) {
      //           this.status = 'TIDAK AKTIF';
      //         } else {
      //           this.status = 'ERROR';
      //         }
      //         this.dataKeluarahan.push({
      //           no: this.pageIndex * this.pageSize + index + 1 + '.',
      //           villageId: element.villageId,
      //           villageName: element.villageName,
      //           villagePostalCode: element.villagePostalCode,
      //           districtName: element.districtName,
      //           cityName: element.cityName,
      //           provinceName: element.provinceName,
      //           countryNameIdn: element.countryNameIdn,
      //           status: this.status,
      //         });
      //       });
      //       this.isLoading = false;
      //       this.dataSource = new MatTableDataSource(this.dataKeluarahan);
      //     },
      //     (error) => {
      //       const errorMessage =
      //         error.status === 500
      //           ? 'Internal Server Error'
      //           : 'Unexpected error occurred';

      //       const Toast = Swal.mixin({
      //         toast: true,
      //         position: 'top-end',
      //         showConfirmButton: false,
      //         timer: 3000,
      //       });

      //       Toast.fire({
      //         icon: 'error',
      //         title: errorMessage,
      //       });
      //     }
      //   );
    } else {
      this.httpOptions.headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${this.token}`
      );
      this.dataSearchKeluarahan = [];

      try {
        const res = await this.wilayahService
          .getAllc(
            'village/?villageId.contains=' +
              this.searchData +
              '&villageName.contains=' +
              this.searchData +
              '&villagePostalCode.contains=' +
              this.searchData +
              '&districtName.contains=' +
              this.searchData +
              '&cityName.contains=' +
              this.searchData +
              '&provinceName.contains=' +
              this.searchData +
              '&countryNameIdn.contains=' +
              this.searchData +
              '&sort=villageName,asc&page=' +
              this.pageIndex +
              '&size=' +
              this.pageSize,
            this.httpOptions,
            catchError(this.handleError.handleErrorDetailUser.bind(this))
          )
          .toPromise();
        this.totalRec = res.body.paging.totalrecord;
        res.body.result.forEach((element: any, index: any) => {
          if (element.flag === false) {
            this.status = 'AKTIF';
          } else if (element.flag === true) {
            this.status = 'TIDAK AKTIF';
          } else {
            this.status = 'ERROR';
          }
          this.dataSearchKeluarahan.push({
            no: this.pageIndex * this.pageSize + index + 1 + '.',
            villageId: element.villageId,
            villageName: element.villageName,
            villagePostalCode: element.villagePostalCode,
            districtName: element.districtName,
            cityName: element.cityName,
            provinceName: element.provinceName,
            countryNameIdn: element.countryNameIdn,
            status: this.status,
          });
        });
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
      } catch (error) {
        let errorMessage = 'Unexpected error occurred';

        if (typeof error === 'object' && error !== null) {
          const responseError = error as { response?: { status: number } };
          if (responseError.response?.status === 500) {
            errorMessage = 'Internal Server Error';
          }
        }

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'error',
          title: errorMessage,
        });
      }

      // this.wilayahService
      //   .getAllc(
      //     'village/?villageId.contains=' +
      //       this.searchData +
      //       '&villageName.contains=' +
      //       this.searchData +
      //       '&villagePostalCode.contains=' +
      //       this.searchData +
      //       '&districtName.contains=' +
      //       this.searchData +
      //       '&cityName.contains=' +
      //       this.searchData +
      //       '&provinceName.contains=' +
      //       this.searchData +
      //       '&countryNameIdn.contains=' +
      //       this.searchData +
      //       '&sort=villageName,asc&page=' +
      //       this.pageIndex +
      //       '&size=' +
      //       this.pageSize,
      //     this.httpOptions,
      //     catchError(this.handleError.handleErrorDetailUser.bind(this))
      //   )
      //   .subscribe(
      //     (res) => {
      //       this.totalRec = res.body.paging.totalrecord;
      //       res.body.result.forEach((element: any, index: any) => {
      //         if (element.flag === false) {
      //           this.status = 'AKTIF';
      //         } else if (element.flag === true) {
      //           this.status = 'TIDAK AKTIF';
      //         } else {
      //           this.status = 'ERROR';
      //         }
      //         this.dataSearchKeluarahan.push({
      //           no: this.pageIndex * this.pageSize + index + 1 + '.',
      //           villageId: element.villageId,
      //           villageName: element.villageName,
      //           villagePostalCode: element.villagePostalCode,
      //           districtName: element.districtName,
      //           cityName: element.cityName,
      //           provinceName: element.provinceName,
      //           countryNameIdn: element.countryNameIdn,
      //           status: this.status,
      //         });
      //       });
      //       this.isLoading = false;
      //       this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
      //     },
      //     (error) => {
      //       // console.log(error);
      //       this.isLoading = false;
      //       this.error = true;
      //       const Toast = Swal.mixin({
      //         toast: true,
      //         position: 'top-end',
      //         showConfirmButton: false,
      //         timer: 3000,

      //         didOpen: (toast) => {
      //           toast.addEventListener('mouseenter', Swal.stopTimer);
      //           toast.addEventListener('mouseleave', Swal.resumeTimer);
      //         },
      //       });

      //       Toast.fire({
      //         icon: 'error',
      //         title: 'Service Unavailable',
      //       });
      //     }
      //   );
    }
  }

  async searchKelurahan(): Promise<void> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );

    this.noData = false;
    this.error = false;
    this.isLoading = true;

    this.pageIndex = 0;
    this.dataSearchKeluarahan = [];
    this.dataKeluarahan = [];

    try {
      const res = await this.wilayahService
        .getAllc(
          'village/?villageId.contains=' +
            this.searchData +
            '&villageName.contains=' +
            this.searchData +
            '&villagePostalCode.contains=' +
            this.searchData +
            '&districtName.contains=' +
            this.searchData +
            '&cityName.contains=' +
            this.searchData +
            '&provinceName.contains=' +
            this.searchData +
            '&countryNameIdn.contains=' +
            this.searchData +
            '&sort=villageName,asc&page=' +
            this.pageIndex +
            '&size=' +
            this.pageSize,
          this.httpOptions,
          catchError(this.handleError.handleErrorDetailUser.bind(this))
        )
        .toPromise();
      this.dataSearchKeluarahan = [];
      this.dataKeluarahan = [];

      this.totalRec = res.body.paging.totalrecord;
      res.body.result.forEach((element: any, index: any) => {
        if (element.flag === false) {
          this.status = 'AKTIF';
        } else if (element.flag === true) {
          this.status = 'TIDAK AKTIF';
        } else {
          this.status = 'ERROR';
        }
        this.dataSearchKeluarahan.push({
          no: this.pageIndex * this.pageSize + index + 1 + '.',
          villageId: element.villageId,
          villageName: element.villageName,
          villagePostalCode: element.villagePostalCode,
          districtName: element.districtName,
          cityName: element.cityName,
          provinceName: element.provinceName,
          countryNameIdn: element.countryNameIdn,
          status: this.status,
        });
      });
      this.isLoading = false;
      this.noData = true;
      this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
    } catch (error) {
      let errorMessage = 'Unexpected error occurred';

      if (typeof error === 'object' && error !== null) {
        const responseError = error as { response?: { status: number } };
        if (responseError.response?.status === 500) {
          errorMessage = 'Internal Server Error';
        }
      }

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      });

      Toast.fire({
        icon: 'error',
        title: errorMessage,
      });
    }

    //  this.wilayahService
    //   .getAllc(
    //     'village/?villageId.contains=' +
    //       this.searchData +
    //       '&villageName.contains=' +
    //       this.searchData +
    //       '&villagePostalCode.contains=' +
    //       this.searchData +
    //       '&districtName.contains=' +
    //       this.searchData +
    //       '&cityName.contains=' +
    //       this.searchData +
    //       '&provinceName.contains=' +
    //       this.searchData +
    //       '&countryNameIdn.contains=' +
    //       this.searchData +
    //       '&sort=villageName,asc&page=' +
    //       this.pageIndex +
    //       '&size=' +
    //       this.pageSize,
    //     this.httpOptions,
    //     catchError(this.handleError.handleErrorDetailUser.bind(this))
    //   )
    //   .subscribe(
    //     (res) => {
    //       this.totalRec = res.body.paging.totalrecord;
    //       res.body.result.forEach((element: any, index: any) => {
    //         if (element.flag === false) {
    //           this.status = 'AKTIF';
    //         } else if (element.flag === true) {
    //           this.status = 'TIDAK AKTIF';
    //         } else {
    //           this.status = 'ERROR';
    //         }
    //         this.dataSearchKeluarahan.push({
    //           no: this.pageIndex * this.pageSize + index + 1 + '.',
    //           villageId: element.villageId,
    //           villageName: element.villageName,
    //           villagePostalCode: element.villagePostalCode,
    //           districtName: element.districtName,
    //           cityName: element.cityName,
    //           provinceName: element.provinceName,
    //           countryNameIdn: element.countryNameIdn,
    //           status: this.status,
    //         });
    //       });
    //       this.isLoading = false;
    //       this.noData = true;
    //       this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
    //       this.dataSearchKeluarahan = [];
    //     },
    //     (error) => {
    //       // console.log(error);
    //       this.isLoading = false;
    //       this.error = true;
    //       const Toast = Swal.mixin({
    //         toast: true,
    //         position: 'top-end',
    //         showConfirmButton: false,
    //         timer: 3000,

    //         didOpen: (toast) => {
    //           toast.addEventListener('mouseenter', Swal.stopTimer);
    //           toast.addEventListener('mouseleave', Swal.resumeTimer);
    //         },
    //       });

    //       Toast.fire({
    //         icon: 'error',
    //         title: 'Service Unavailable',
    //       });
    //     }
    //   );
  }

  onSearchChange() {
    this.noData = false;
    if (this.searchData === '') {
      this.isLoading = true;
      this.searchKelurahan();
    }
  }

  cekValidasi() {
    this.formValidasi = this.formBuilder.group({
      statusData: 'all',
      searchData: '',
    });
    this.searchData = this.formValidasi.get('searchData')!.value;
  }

  private buildUrlWithFlag(flag: boolean | undefined): string {
    let url = `village/?sort=villageName,asc&page=${this.pageIndex}&size=${this.pageSize}`;

    if (flag !== undefined) {
      url += `&flag.equals=${flag}`;
    }

    return url;
  }

  refreshPage() {
    location.reload();
  }
}
