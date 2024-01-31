import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DataKecamatanComponent } from '../data-kecamatan/data-kecamatan.component';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { Kabupaten } from 'src/app/model/kabupatenModel';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Provinsi } from 'src/app/model/provinsiModel';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../../services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-kelurahan',
  templateUrl: './create-kelurahan.component.html',
  styleUrls: ['./create-kelurahan.component.css'],
})
export class CreateKelurahanComponent implements OnInit {
  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private title: Title,
    private handleError: ErrorRequestService
  ) {
    this.cekValidasi();
    this.nik = this.authUser.profileHeader.nik;
    this.token = this.authUser.token;
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

  ngOnInit(): void {
    this.getCountry();
    this.getProvinsi();
    this.getKabupaten();
    this.title.setTitle('Buat Kelurahan');
    console.log(this.nik);
  }

  namaKelurahan: any;
  kodePos: any;
  idKecamatan: any;
  namaKecamatan: any;
  selectIdKabupaten: any;
  selectIdProvinsi: any;
  selectIdNegara: any;
  dataNegara: Negara[] = [];
  dataSourceNegara!: MatTableDataSource<Negara>;
  dataProvinsi: Provinsi[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  dataKabupaten: Kabupaten[] = [];
  dataSourceKabupaten!: MatTableDataSource<Kabupaten>;
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

  getKabupaten() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    this.wilayahService
      .getAllc(
        'city/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe((res) => {
        this.dataKabupaten = res.body.result;
        this.dataSourceKabupaten = new MatTableDataSource(this.dataKabupaten);
      });
  }

  getDataKecamatan() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = '80%';
    dialogConfig.height = '90%';
    this.dialog
      .open(DataKecamatanComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.namaKecamatan = res.districtName;
        this.idKecamatan = res.districtId;
        this.selectIdKabupaten = res.cityId;
        this.selectIdProvinsi = res.provinceId;
        this.selectIdNegara = res.countryId;
      });
  }

  createKelurahan() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    if (this.formValidasi.invalid) {
      if (this.formValidasi.controls.namaKelurahan.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi Nama Kelurahan',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaKelurahan.errors?.pattern) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Isi Nama Kelurahan salah',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.kodePos.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong isi Kode Pos',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (
        this.formValidasi.controls.kodePos.value &&
        this.formValidasi.controls.kodePos.value.length < 4
      ) {
        // ! Menampilkan Swal jika length kodepos kurang dari 4
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Panjang Kode Pos minimal 4 karakter',
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (this.formValidasi.controls.namaKecamatan.errors?.required) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Tolong pilih Kecamatan',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    let parameter = {
      cityId: this.selectIdKabupaten,
      countryId: this.selectIdNegara,
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
      villageName: this.namaKelurahan,
      villagePostalCode: this.kodePos,
      createdBy: this.nik,
    };
    console.log(parameter);
    this.wilayahService
      .postAllc(
        'village',
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
                this.router.navigate(['/wilayah-kelurahan-auth/' + this.token]);
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
      idKelurahan: { value: '', disabled: true },
      namaKelurahan: [
        '',
        [Validators.required, Validators.pattern(/^[\w]+(?:\s[\w]+)*$/)],
      ],
      kodePos: ['', [Validators.required]],
      namaKecamatan: ['', [Validators.required]],
      selectIdKabupaten: { value: '', disabled: true },
      selectIdProvinsi: { value: '', disabled: true },
      selectIdNegara: { value: '', disabled: true },
    });
  }
}
