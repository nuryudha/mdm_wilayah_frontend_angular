// import { Component, OnInit } from '@angular/core';

// import { ActivatedRoute } from '@angular/router';
// import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
// import { HttpHeaders } from '@angular/common/http';
// import { Keluarahan } from 'src/app/model/kelurahanModel';
// import { MatTableDataSource } from '@angular/material/table';
// import { PageEvent } from '@angular/material/paginator';
// import Swal from 'sweetalert2';
// import { Title } from '@angular/platform-browser';
// import { WilayahService } from '../../services/wilayah.service';
// import { catchError } from 'rxjs/operators';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';

// @Component({
//   selector: 'app-wilayah-kelurahan',
//   templateUrl: './wilayah-kelurahan.component.html',
//   styleUrls: ['./wilayah-kelurahan.component.css'],
// })
// export class WilayahKelurahanComponent implements OnInit {
//   constructor(
//     private wilayahService: WilayahService,
//     private title: Title,
//     private route: ActivatedRoute,
//     private handleError: ErrorRequestService,
//     private formBuilder: FormBuilder
//   ) {
//     this.token = this.authUser.token;
//     this.nik = this.authUser.profileHeader.nik;
//   }

//   authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

//   ngOnInit(): void {
//     this.cekValidasi();

//     this.getKelurahanByStatus(this.status);
//     console.log(this.nik);
//     this.title.setTitle('Kelurahan');
//   }

//   httpHeaders = new HttpHeaders({
//     'Content-Type': 'application/json',
//   });

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//     }),
//     observe: 'response',
//     responseType: 'json',
//   };

//   displayedColumns = [
//     'no',
//     'villageId',
//     'villageName',
//     'villagePostalCode',
//     'districtName',
//     'cityName',
//     'provinceName',
//     'countryNameIdn',
//     'status',
//     'action',
//   ];
//   totalRec: any;
//   pageSize = 10;
//   pageIndex = 0;
//   pageSizeOptions = [10, 20, 100];
//   pageEvent!: PageEvent;
//   searchData: any;
//   dataKeluarahan: Keluarahan[] = [];
//   dataSource!: MatTableDataSource<Keluarahan>;
//   dataSearchKeluarahan: any;
//   isLoading = true;
//   error = false;
//   statusText: any;
//   noData = false;
//   nik: any;
//   token: any;
//   status: string = '';
//   formValidasi!: FormGroup;
//   url: any;
//   flag: boolean | undefined;

//   getKelurahan(url?: any): void {
//     this.httpOptions.headers = this.httpHeaders.set(
//       'Authorization',
//       `Bearer ${this.token}`
//     );
//     this.noData = false;
//     this.isLoading = true;
//     this.error = false;
//     this.dataKeluarahan = [];
//     this.dataSource = new MatTableDataSource(this.dataKeluarahan);
//     if (url) {
//       console.log(url);
//     }
//     this.wilayahService
//       .getAllc(
//         url,
//         this.httpOptions,
//         catchError(this.handleError.handleErrorDetailUser.bind(this))
//       )
//       .subscribe(
//         (res) => {
//           this.totalRec = res.body.paging.totalrecord;
//           res.body.result.forEach((element: any, index: any) => {
//             if (element.flag === false) {
//               this.status = 'AKTIF';
//             } else if (element.flag === true) {
//               this.status = 'TIDAK AKTIF';
//             } else {
//               this.status = 'ERROR';
//             }
//             this.dataKeluarahan.push({
//               no: this.pageIndex * this.pageSize + index + 1 + '.',
//               villageId: element.villageId,
//               villageName: element.villageName,
//               villagePostalCode: element.villagePostalCode,
//               districtName: element.districtName,
//               cityName: element.cityName,
//               provinceName: element.provinceName,
//               countryNameIdn: element.countryNameIdn,
//               status: this.status,
//             });
//           });
//           this.isLoading = false;
//           this.error = false;
//           this.dataSource = new MatTableDataSource(this.dataKeluarahan);
//         },
//         (error) => {
//           console.log(error);
//           this.statusText = error.statusText;
//           this.isLoading = false;
//           this.error = true;
//           const Toast = Swal.mixin({
//             toast: true,
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 3000,

//             didOpen: (toast) => {
//               toast.addEventListener('mouseenter', Swal.stopTimer);
//               toast.addEventListener('mouseleave', Swal.resumeTimer);
//             },
//           });

//           Toast.fire({
//             icon: 'error',
//             title: 'Service Unavailable',
//           });
//         }
//       );
//   }

//   handlePageEvent(e: PageEvent) {
//     this.noData = false;
//     this.error = false;
//     this.isLoading = true;
//     this.pageEvent = e;
//     this.pageSize = e.pageSize;
//     this.pageIndex = e.pageIndex;

//     //  getKelurahan
//     this.dataKeluarahan = [];
//     this.dataSource = new MatTableDataSource(this.dataKeluarahan);

//     console.log(this.flag);
//     console.log(this.pageIndex);
//     // const searchData = this.formValidasi.get('searchData')?.value;

//     if (this.searchData == '') {
//       this.httpOptions.headers = this.httpHeaders.set(
//         'Authorization',
//         `Bearer ${this.token}`
//       );
//       this.wilayahService
//         .getAllc(
//           'village/?sort=villageName,asc&page=' +
//             this.pageIndex +
//             '&size=' +
//             this.pageSize +
//             '&flag.equals=' +
//             this.flag,
//           this.httpOptions,
//           catchError(this.handleError.handleErrorDetailUser.bind(this))
//         )
//         .subscribe(
//           (res) => {
//             this.pageEvent = e;
//             this.pageSize = e.pageSize;
//             this.pageIndex = e.pageIndex;
//             this.totalRec = res.body.paging.totalrecord;
//             console.log(res.body.paging.totalrecord);

//             res.body.result.forEach((element: any, index: any) => {
//               if (element.flag === false) {
//                 this.status = 'AKTIF';
//               } else if (element.flag === true) {
//                 this.status = 'TIDAK AKTIF';
//               } else {
//                 this.status = 'ERROR';
//               }
//               this.dataKeluarahan.push({
//                 no: this.pageIndex * this.pageSize + index + 1 + '.',
//                 villageId: element.villageId,
//                 villageName: element.villageName,
//                 villagePostalCode: element.villagePostalCode,
//                 districtName: element.districtName,
//                 cityName: element.cityName,
//                 provinceName: element.provinceName,
//                 countryNameIdn: element.countryNameIdn,
//                 status: this.status,
//               });
//             });
//             this.isLoading = false;
//             this.dataSource = new MatTableDataSource(this.dataKeluarahan);
//           },
//           (error) => {
//             // console.log(error);
//             this.isLoading = false;
//             this.error = true;
//             const Toast = Swal.mixin({
//               toast: true,
//               position: 'top-end',
//               showConfirmButton: false,
//               timer: 3000,

//               didOpen: (toast) => {
//                 toast.addEventListener('mouseenter', Swal.stopTimer);
//                 toast.addEventListener('mouseleave', Swal.resumeTimer);
//               },
//             });

//             Toast.fire({
//               icon: 'error',
//               title: 'Service Unavailable',
//             });
//           }
//         );
//     } else {
//       this.httpOptions.headers = this.httpHeaders.set(
//         'Authorization',
//         `Bearer ${this.token}`
//       );
//       this.dataSearchKeluarahan = [];
//       this.wilayahService
//         .getAllc(
//           'village/?villageId.contains=' +
//             this.searchData +
//             '&villageName.contains=' +
//             this.searchData +
//             '&villagePostalCode.contains=' +
//             this.searchData +
//             '&districtName.contains=' +
//             this.searchData +
//             '&cityName.contains=' +
//             this.searchData +
//             '&provinceName.contains=' +
//             this.searchData +
//             '&countryNameIdn.contains=' +
//             this.searchData +
//             '&sort=villageName,asc&page=' +
//             this.pageIndex +
//             '&size=' +
//             this.pageSize,
//           this.httpOptions,
//           catchError(this.handleError.handleErrorDetailUser.bind(this))
//         )
//         .subscribe(
//           (res) => {
//             this.totalRec = res.body.paging.totalrecord;
//             res.body.result.forEach((element: any, index: any) => {
//               if (element.flag === false) {
//                 this.status = 'AKTIF';
//               } else if (element.flag === true) {
//                 this.status = 'TIDAK AKTIF';
//               } else {
//                 this.status = 'ERROR';
//               }
//               this.dataSearchKeluarahan.push({
//                 no: this.pageIndex * this.pageSize + index + 1 + '.',
//                 villageId: element.villageId,
//                 villageName: element.villageName,
//                 villagePostalCode: element.villagePostalCode,
//                 districtName: element.districtName,
//                 cityName: element.cityName,
//                 provinceName: element.provinceName,
//                 countryNameIdn: element.countryNameIdn,
//                 status: this.status,
//               });
//             });
//             this.isLoading = false;
//             this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
//           },
//           (error) => {
//             // console.log(error);
//             this.isLoading = false;
//             this.error = true;
//             const Toast = Swal.mixin({
//               toast: true,
//               position: 'top-end',
//               showConfirmButton: false,
//               timer: 3000,

//               didOpen: (toast) => {
//                 toast.addEventListener('mouseenter', Swal.stopTimer);
//                 toast.addEventListener('mouseleave', Swal.resumeTimer);
//               },
//             });

//             Toast.fire({
//               icon: 'error',
//               title: 'Service Unavailable',
//             });
//           }
//         );
//     }
//   }

//   searchKelurahan() {
//     this.httpOptions.headers = this.httpHeaders.set(
//       'Authorization',
//       `Bearer ${this.token}`
//     );
//     this.noData = false;
//     this.error = false;
//     this.isLoading = true;
//     this.pageIndex = 0;
//     this.dataSearchKeluarahan = [];
//     this.wilayahService
//       .getAllc(
//         'village/?villageId.contains=' +
//           this.searchData +
//           '&villageName.contains=' +
//           this.searchData +
//           '&villagePostalCode.contains=' +
//           this.searchData +
//           '&districtName.contains=' +
//           this.searchData +
//           '&cityName.contains=' +
//           this.searchData +
//           '&provinceName.contains=' +
//           this.searchData +
//           '&countryNameIdn.contains=' +
//           this.searchData +
//           '&sort=villageName,asc&page=' +
//           this.pageIndex +
//           '&size=' +
//           this.pageSize,
//         this.httpOptions,
//         catchError(this.handleError.handleErrorDetailUser.bind(this))
//       )
//       .subscribe(
//         (res) => {
//           this.totalRec = res.body.paging.totalrecord;
//           res.body.result.forEach((element: any, index: any) => {
//             if (element.flag === false) {
//               this.status = 'AKTIF';
//             } else if (element.flag === true) {
//               this.status = 'TIDAK AKTIF';
//             } else {
//               this.status = 'ERROR';
//             }
//             this.dataSearchKeluarahan.push({
//               no: this.pageIndex * this.pageSize + index + 1 + '.',
//               villageId: element.villageId,
//               villageName: element.villageName,
//               villagePostalCode: element.villagePostalCode,
//               districtName: element.districtName,
//               cityName: element.cityName,
//               provinceName: element.provinceName,
//               countryNameIdn: element.countryNameIdn,
//               status: this.status,
//             });
//           });
//           this.isLoading = false;
//           this.noData = true;
//           this.dataSource = new MatTableDataSource(this.dataSearchKeluarahan);
//           this.dataSearchKeluarahan = [];
//         },
//         (error) => {
//           // console.log(error);
//           this.isLoading = false;
//           this.error = true;
//           const Toast = Swal.mixin({
//             toast: true,
//             position: 'top-end',
//             showConfirmButton: false,
//             timer: 3000,

//             didOpen: (toast) => {
//               toast.addEventListener('mouseenter', Swal.stopTimer);
//               toast.addEventListener('mouseleave', Swal.resumeTimer);
//             },
//           });

//           Toast.fire({
//             icon: 'error',
//             title: 'Service Unavailable',
//           });
//         }
//       );
//   }

//   onSearchChange() {
//     this.noData = false;
//     if (this.searchData === '') {
//       this.isLoading = true;
//       this.searchKelurahan();
//     } else {
//     }
//   }

//   deleteKelurahan(dataKeluarahan: any) {
//     this.httpOptions.headers = this.httpHeaders.set(
//       'Authorization',
//       `Bearer ${this.token}`
//     );
//     let kelurahanId = dataKeluarahan.villageId;
//     let nik = this.nik;
//     console.log(kelurahanId);
//     Swal.fire({
//       title: 'Apakah kamu yakin?',
//       text: 'Apakah kamu yakin ingin menghapus data ini?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Ya, hapus',
//       cancelButtonText: 'Tidak',
//     }).then((res) => {
//       if (res.isConfirmed) {
//         this.wilayahService
//           .deleteAllc(
//             'village/' + kelurahanId + '/' + nik,
//             this.httpOptions,
//             catchError(this.handleError.handleErrorDetailUser.bind(this))
//           )
//           .subscribe(
//             (res) => {
//               let statusCode = res.body.status.responseCode;
//               let statusDesc = res.body.status.responseDesc;
//               if (statusCode == '200') {
//                 Swal.fire({
//                   position: 'center',
//                   icon: 'success',
//                   title: statusDesc,
//                   showConfirmButton: false,
//                   timer: 1500,
//                 }).then((res) => {
//                   if (res) this.getKelurahan();
//                 });
//               } else {
//                 Swal.fire({
//                   position: 'center',
//                   icon: 'error',
//                   title: statusDesc,
//                   showConfirmButton: false,
//                   timer: 1500,
//                 });
//               }
//             },
//             (error) => {
//               Swal.fire({
//                 position: 'center',
//                 icon: 'error',
//                 title: 'Service Unavailable',
//                 showConfirmButton: false,
//                 timer: 1500,
//               });
//             }
//           );
//       }
//     });
//   }

//   cekValidasi() {
//     this.formValidasi = this.formBuilder.group({
//       statusData: 'all',
//       searchData: '',
//     });
//     this.searchData = this.formValidasi.get('searchData')!.value;
//   }
//   getKelurahanByStatus(event: any): void {
//     const selectedValue = event.value;

//     if (selectedValue === 'aktif') {
//       this.flag = false;
//     } else if (selectedValue === 'tidak aktif') {
//       this.flag = true;
//     } else if (selectedValue === 'all') {
//       this.flag = undefined;
//     }

//     this.url = this.buildUrlWithFlag(this.flag);
//     this.getKelurahan(this.url);
//   }

//   private buildUrlWithFlag(flag: boolean | undefined): string {
//     let url = `village/?sort=villageName,asc&page=${this.pageIndex}&size=${this.pageSize}`;

//     if (flag !== undefined) {
//       url += `&flag.equals=${flag}`;
//     }

//     return url;
//   }
// }
