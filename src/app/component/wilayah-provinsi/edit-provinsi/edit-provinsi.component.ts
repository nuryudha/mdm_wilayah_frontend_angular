import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-provinsi',
  templateUrl: './edit-provinsi.component.html',
  styleUrls: ['./edit-provinsi.component.css'],
})
export class EditProvinsiComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private formBuilder: FormBuilder,
    private handleError: ErrorRequestService
  ) {
    this.cekValidasi();
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getCountry();
    this.getIdProvinsi();
    this.title.setTitle('Edit Provinsi');
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

  dataNegara: Negara[] = [];
  dataSource!: MatTableDataSource<Negara>;
  formValidasi!: FormGroup;
  id: any;
  statusText: any;
  error = false;
  nik: any;
  isLoading = false;
  data = false;
  token: any;
  flag: boolean = false;

  getCountry() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.isLoading = true;
    this.data = false;
    this.wilayahService
      .getAllc(
        'country/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          this.dataNegara = res.body.result;
          this.dataSource = new MatTableDataSource(this.dataNegara);
          this.data = true;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          this.statusText = error.statusText;
          this.error = true;
          Swal.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }

  getIdProvinsi() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.wilayahService
      .getIdc(
        'province/' + this.id,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe((res) => {
        console.log(res);
        this.flag = res.body.result.flag;
        this.formValidasi.patchValue({
          selectIdNegara: res.body.result.countryId,
          namaProvinsi: res.body.result.provinceName,
          idProvinsi: this.id,
        });
        if (this.flag === true) {
          this.formValidasi.get('namaProvinsi')!.disable();
          this.formValidasi.get('selectIdNegara')!.disable();
        } else {
          this.formValidasi.get('namaProvinsi')!.enable();
          this.formValidasi.get('selectIdNegara')!.enable();
        }
      });
  }

  saveEditProvinsi() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    if (this.formValidasi.invalid) {
      if (this.formValidasi.controls.namaProvinsi.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi Nama Provinsi',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaProvinsi.errors?.pattern) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Isi Nama Provinsi salah',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.selectIdNegara.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong pilih Negara',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    let parameter = {
      countryId: this.formValidasi.value.selectIdNegara,
      provinceName: this.formValidasi.value.namaProvinsi,
      provinceId: this.id,
      updatedBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .putIdc(
        'province/',
        parameter,
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
              if (res) {
                this.router.navigate(['/wilayah-provinsi-auth/' + this.token]);
              }
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
          console.log(error.status);
          let errorText = error.error.status.responseDesc;
          console.log(error);
          if (error.status == '400') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: errorText,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
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
        }
      );
  }

  cekValidasi() {
    this.formValidasi = this.formBuilder.group({
      idProvinsi: { value: '', disabled: true },
      namaProvinsi: [
        { value: '' },
        [Validators.required, Validators.pattern(/^[\w]+(?:\s[\w]+)*$/)],
      ],
      selectIdNegara: [{ value: '' }, [Validators.required]],
    });
  }

  changeStatus() {
    let provinceId = this.id;
    let nik = this.nik;
    let title: string = '';
    if (this.flag === true) {
      title = 'aktifkan';
    } else if (this.flag === false) {
      title = 'nonaktifkan';
    }
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: `Apakah kamu yakin ingin me${title} data ini?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Ya, ${title}`,
      cancelButtonText: 'Tidak',
    }).then((result) => {
      // Periksa jika pengguna benar-benar mengklik tombol konfirmasi
      if (result.isConfirmed) {
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
                }).then(() => {
                  this.router.navigate([
                    '/wilayah-provinsi-auth/' + this.token,
                  ]);
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
