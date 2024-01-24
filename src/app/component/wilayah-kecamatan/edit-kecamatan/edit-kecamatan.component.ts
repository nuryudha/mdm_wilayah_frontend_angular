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
  selector: 'app-edit-kecamatan',
  templateUrl: './edit-kecamatan.component.html',
  styleUrls: ['./edit-kecamatan.component.css'],
})
export class EditKecamatanComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private wilayahService: WilayahService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    console.log(this.nik);
    this.idKecamatan = this.id;
    this.getCountry();
    this.getProvinsi();
    this.getIdKecamatan();
    this.title.setTitle('Edit Kecamatan');
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
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataNegara: Negara[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataProvinsi: Provinsi[] = [];
  namaKecamatan: any;
  idKecamatan: any;
  namaKabupaten: any;
  idKabupaten: any;
  selectNameProvinsi: any;
  selectIdProvinsi: any;
  selectNameNegara: any;
  selectIdNegara: any;
  id: any;
  statusText: any;
  error = false;
  nik: any;
  isLoading = false;
  data = false;
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

  getIdKecamatan() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.wilayahService
      .getIdc(
        'district/' + this.id,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe((res) => {
        console.log(res);
        this.namaKecamatan = res.body.result.districtName;
        this.namaKabupaten = res.body.result.cityName;
        this.idKabupaten = res.body.result.cityId;
        this.selectNameProvinsi = res.body.result.provinceName;
        this.selectIdProvinsi = res.body.result.provinceId;
        this.selectNameNegara = res.body.result.countryNameIdn;
        this.selectIdNegara = res.body.result.countryId;
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
        this.selectIdProvinsi = res.countryId;
        this.selectNameNegara = res.countryNameIdn;
        this.selectIdNegara = res.provinceId;
      });
  }

  saveEditKecamatan() {
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
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      cityId: this.idKabupaten,
      cityName: this.namaKabupaten,
      provinceId: this.selectIdProvinsi,
      countryId: this.selectIdNegara,
      updatedBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .putIdc(
        'district',
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
      selectNameProvinsi: { value: '', disabled: true },
      selectNameNegara: { value: '', disabled: true },
    });
  }
}
