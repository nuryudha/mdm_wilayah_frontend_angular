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
  selector: 'app-edit-negara',
  templateUrl: './edit-negara.component.html',
  styleUrls: ['./edit-negara.component.css'],
})
export class EditNegaraComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private wilayahService: WilayahService,
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
    this.id = this.route.snapshot.params['id'];
    this.getId();
    this.title.setTitle('Edit Negara');
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

  token: any;
  formValidasi!: FormGroup;
  id: any;
  idNegara: any;
  namaNegara: any;
  isLoading = true;
  data = false;
  nik: any;

  getId() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.isLoading = true;
    this.data = false;
    this.wilayahService
      .getIdc(
        'country/' + this.id,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.idNegara = res.body.result.countryId;
          this.namaNegara = res.body.result.countryNameIdn;
          this.data = true;
          this.isLoading = false;
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Service Unavailable',
          });
        }
      );
  }

  saveEdit() {
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
      updatedBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .putIdc(
        'country/',
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
                this.router.navigate(['/wilayah-negara-auth/' + this.token]);
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
}
