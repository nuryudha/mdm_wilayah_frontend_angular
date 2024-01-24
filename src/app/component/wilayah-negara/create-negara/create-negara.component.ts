import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-negara',
  templateUrl: './create-negara.component.html',
  styleUrls: ['./create-negara.component.css'],
})
export class CreateNegaraComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private title: Title,
    private handleError: ErrorRequestService
  ) {
    this.cekValidasi();
    this.token = this.authUser.token;
    this.nik = this.authUser.profileHeader.nik;
  }

  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.getCountry();
    this.title.setTitle('Buat Negara');
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

  formValidasi!: FormGroup;
  idNegara: any;
  namaNegara: any;
  nik: any;
  token: any;

  cekValidasi() {
    this.formValidasi = this.formBuilder.group({
      idNegara: [
        '',
        [Validators.required, Validators.pattern(/^[\w]+(?:\s[\w]+)*$/)],
      ],
      namaNegara: [
        '',
        [Validators.required, Validators.pattern(/^[\w]+(?:\s[\w]+)*$/)],
      ],
    });
  }

  getCountry() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.wilayahService
      .getAllc(
        'country/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {},
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }
  createNegara() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    if (this.formValidasi.invalid) {
      if (this.formValidasi.controls.idNegara.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi ID Negara',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.idNegara.errors?.pattern) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Isi ID Negara salah',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaNegara.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi Nama Negara',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaNegara.errors?.pattern) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Isi Nama Negara salah',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    let parameter = {
      countryId: this.idNegara,
      countryNameIdn: this.namaNegara,
      createdBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .postAllc(
        'country',
        parameter,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          let statusCode = res.body.status.responseCode;
          let statusDesc = res.body.status.responseDesc;
          console.log(res);
          if (statusCode == '200') {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: statusDesc,
              showConfirmButton: false,
              timer: 1500,
            }).then((res) => {
              if (res) {
                this.router.navigate(['/wilayah-negara-auth/' + this.token]);
              }
            });
          } else if (statusCode == '400') {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: statusDesc,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Service Not Found',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        },
        (error) => {
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
}
