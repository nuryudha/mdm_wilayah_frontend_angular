import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataKabupatenComponent } from '../data-kabupaten/data-kabupaten.component';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-kecamatan',
  templateUrl: './create-kecamatan.component.html',
  styleUrls: ['./create-kecamatan.component.css'],
})
export class CreateKecamatanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private handleError: ErrorRequestService
  ) {
    this.cekValidasi();
    this.nik = this.authUser.profileHeader.nik;
    this.token = this.authUser.token;
  }
  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  ngOnInit(): void {
    this.getCountry();
    this.getProvinsi();
    this.title.setTitle('Buat Kecamatan');
    console.log(this.nik);
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

  selectNameProvinsi: any;
  selectIdProvinsi: any;
  selectNameNegara: any;
  selectIdNegara: any;
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  namaKabupaten: any;
  idKabupaten: any;
  namaKecamatan: any;
  formValidasi!: FormGroup;
  statusText: any;
  error = false;
  nik: any;
  isLoading = false;
  data = false;
  noData = false;
  token: any;

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
          this.dataSourceNegara = new MatTableDataSource(this.dataNegara);
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

  getProvinsi() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.wilayahService
      .getAllc(
        'province/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe((res) => {
        this.dataProvinsi = res.body.result;
        this.dataSourceProvinsi = new MatTableDataSource(this.dataProvinsi);
      });
  }

  getDataKabupaten() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    this.dialog
      .open(DataKabupatenComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.namaKabupaten = res.cityName;
        this.idKabupaten = res.cityId;
        this.selectNameProvinsi = res.provinceName;
        this.selectIdProvinsi = res.provinceId;
        this.selectNameNegara = res.countryNameIdn;
        this.selectIdNegara = res.countryId;
      });
  }
  createKecamatan() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    if (this.formValidasi.invalid) {
      if (this.formValidasi.controls.namaKecamatan.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi Nama Kecamatan',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaKecamatan.errors?.pattern) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Isi Nama Kecamatan salah',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaKabupaten.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong pilih Kabupaten',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    let parameter = {
      cityId: this.idKabupaten,
      cityName: this.namaKabupaten,
      countryId: this.selectIdNegara,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
      createdBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .postAllc(
        'district',
        parameter,
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
              if (res) {
                this.router.navigate(['/wilayah-kecamatan-auth/' + this.token]);
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
      idKecamatan: { value: '', disabled: true },
      namaKecamatan: [
        '',
        [Validators.required, Validators.pattern(/^[\w]+(?:\s[\w]+)*$/)],
      ],
      namaKabupaten: ['', [Validators.required]],
      selectIdProvinsi: { value: '', disabled: true },
      selectIdNegara: { value: '', disabled: true },
    });
  }
}
