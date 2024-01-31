import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs/operators';

import { DataKecamatanComponent } from '../data-kecamatan/data-kecamatan.component';
import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { Kabupaten } from 'src/app/model/kabupatenModel';
import { MatTableDataSource } from '@angular/material/table';
import { Negara } from 'src/app/model/negaraModel';
import { Observable } from 'rxjs';
import { Provinsi } from 'src/app/model/provinsiModel';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { WilayahService } from '../../../services/wilayah.service';

@Component({
  selector: 'app-edit-kelurahan',
  templateUrl: './edit-kelurahan.component.html',
  styleUrls: ['./edit-kelurahan.component.css'],
})
export class EditKelurahanComponent implements OnInit {
  authUser: any = JSON.parse(localStorage.getItem('auth-user') || '{}');

  formValidasi!: FormGroup;
  id: any;
  namaKelurahan: any;
  idKelurahan: any;
  kodePos: any;
  namaKecamatan: any;
  idKecamatan: any;
  selectIdKabupaten: any;
  selectNamaKabupaten: any;
  dataKabupaten: Kabupaten[] = [];
  dataSourceKabupaten!: MatTableDataSource<Kabupaten>;
  selectIdProvinsi: any;
  selectNamaProvinsi: any;
  dataProvinsi: Provinsi[] = [];
  dataSourceProvinsi!: MatTableDataSource<Provinsi>;
  selectIdNegara: any;
  selectNamaNegara: any;
  dataNegara: Negara[] = [];
  dataSourceNegara!: MatTableDataSource<Negara>;
  statusText: any;
  error = false;
  nik: any;
  isLoading = false;
  data = false;
  token: any;
  flag: boolean = false;

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

  constructor(
    private wilayahService: WilayahService,
    private dialog: MatDialog,
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

  async ngOnInit(): Promise<void> {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.idKelurahan = this.id;
    console.log(this.nik);

    this.isLoading = true;
    this.title.setTitle('Edit Kelurahan');

    try {
      await this.getIdKelurahan().toPromise();
      await this.getKabupaten().toPromise();
      await this.getProvinsi().toPromise();
      await this.getCountry().toPromise();
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      console.error(error);
    }
  }

  // getCountry() {
  //   this.httpOptions.headers = this.httpHeaders.set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   this.isLoading = true;
  //   this.data = false;
  //   this.wilayahService
  //     .getAllc(
  //       'country/?page=0&size=1000',
  //       this.httpOptions,
  //       catchError(this.handleError.handleErrorDetailUser.bind(this))
  //     )
  //     .subscribe(
  //       (res) => {
  //         this.dataNegara = res.body.result;
  //         this.dataSourceNegara = new MatTableDataSource(this.dataNegara);
  //         this.data = true;
  //         this.isLoading = false;
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.statusText = error.statusText;
  //         this.error = true;
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Service Unavailable',
  //         });
  //       }
  //     );
  // }

  // getProvinsi() {
  //   this.httpOptions.headers = this.httpHeaders.set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   this.wilayahService
  //     .getAllc(
  //       'province/?page=0&size=1000',
  //       this.httpOptions,
  //       catchError(this.handleError.handleErrorDetailUser.bind(this))
  //     )
  //     .subscribe((res) => {
  //       this.dataProvinsi = res.body.result;
  //       this.dataSourceProvinsi = new MatTableDataSource(this.dataProvinsi);
  //     });
  // }

  // getKabupaten() {
  //   this.httpOptions.headers = this.httpHeaders.set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   this.wilayahService
  //     .getAllc(
  //       'city/?page=0&size=1000',
  //       this.httpOptions,
  //       catchError(this.handleError.handleErrorDetailUser.bind(this))
  //     )
  //     .subscribe((res) => {
  //       this.dataKabupaten = res.body.result;
  //       this.dataSourceKabupaten = new MatTableDataSource(this.dataKabupaten);
  //     });
  // }

  // getIdKelurahan() {
  //   this.httpOptions.headers = this.httpHeaders.set(
  //     'Authorization',
  //     `Bearer ${this.token}`
  //   );
  //   this.wilayahService
  //     .getIdc(
  //       'village/' + this.id,
  //       this.httpOptions,
  //       catchError(this.handleError.handleErrorDetailUser.bind(this))
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.namaKelurahan = res.body.result.villageName;
  //       this.kodePos = res.body.result.villagePostalCode;
  //       this.namaKecamatan = res.body.result.districtName;
  //       this.idKecamatan = res.body.result.districtId;
  //       this.selectIdKabupaten = res.body.result.cityId;
  //       this.selectNamaKabupaten = res.body.result.cityName;
  //       this.selectIdProvinsi = res.body.result.provinceId;
  //       this.selectNamaProvinsi = res.body.result.provinceName;
  //       this.selectIdNegara = res.body.result.countryId;
  //       this.selectNamaNegara = res.body.result.countryNameIdn;
  //       this.flag = res.body.result.flag;
  //       if (this.flag === true) {
  //         this.formValidasi.get('namaKelurahan')!.disable();
  //         this.formValidasi.get('kodePos')!.disable();
  //         this.formValidasi.get('namaKecamatan')!.disable();
  //       } else {
  //         this.formValidasi.get('namaKelurahan')!.enable();
  //         this.formValidasi.get('kodePos')!.enable();
  //         this.formValidasi.get('namaKecamatan')!.enable();
  //       }
  //     });
  // }

  getCountry(): Observable<any> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.wilayahService
      .getAllc(
        'country/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .pipe(
        tap((res) => {
          this.dataNegara = res.body.result;
          this.dataSourceNegara = new MatTableDataSource(this.dataNegara);
          this.data = true;
        }),
        catchError((error) => {
          this.handleErrors(error);
          throw error;
        })
      );
  }

  getProvinsi(): Observable<any> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.wilayahService
      .getAllc(
        'province/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .pipe(
        tap((res) => {
          this.dataProvinsi = res.body.result;
          this.dataSourceProvinsi = new MatTableDataSource(this.dataProvinsi);
        }),
        catchError((error) => {
          this.handleErrors(error);
          throw error;
        })
      );
  }

  getKabupaten(): Observable<any> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.wilayahService
      .getAllc(
        'city/?page=0&size=1000',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .pipe(
        tap((res) => {
          this.dataKabupaten = res.body.result;
          this.dataSourceKabupaten = new MatTableDataSource(this.dataKabupaten);
        }),
        catchError((error) => {
          this.handleErrors(error);
          throw error;
        })
      );
  }

  getIdKelurahan(): Observable<any> {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.wilayahService
      .getIdc(
        'village/' + this.id,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .pipe(
        tap((res) => {
          console.log(res);
          this.namaKelurahan = res.body.result.villageName;
          this.kodePos = res.body.result.villagePostalCode;
          this.namaKecamatan = res.body.result.districtName;
          this.idKecamatan = res.body.result.districtId;
          this.selectIdKabupaten = res.body.result.cityId;
          this.selectNamaKabupaten = res.body.result.cityName;
          this.selectIdProvinsi = res.body.result.provinceId;
          this.selectNamaProvinsi = res.body.result.provinceName;
          this.selectIdNegara = res.body.result.countryId;
          this.selectNamaNegara = res.body.result.countryNameIdn;
          this.flag = res.body.result.flag;

          if (this.flag === true) {
            this.formValidasi.get('namaKelurahan')!.disable();
            this.formValidasi.get('kodePos')!.disable();
            this.formValidasi.get('namaKecamatan')!.disable();
          } else {
            this.formValidasi.get('namaKelurahan')!.enable();
            this.formValidasi.get('kodePos')!.enable();
            this.formValidasi.get('namaKecamatan')!.enable();
          }
        })
      );
  }

  getDataKecamatan() {
    if (this.flag === true) {
    } else {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = false;
      dialogConfig.width = '80%';
      dialogConfig.height = '90%';
      this.dialog
        .open(DataKecamatanComponent, dialogConfig)
        .afterClosed()
        .subscribe((res) => {
          this.namaKecamatan = res.districtName;
          this.idKecamatan = res.districtId;
          this.selectIdKabupaten = res.cityId;
          this.selectIdProvinsi = res.provinceId;
          this.selectIdNegara = res.countryId;
        });
    }
  }

  saveEditKelurahan() {
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.token}`
    );

    if (this.formValidasi.invalid) {
      this.handleValidationErrors();
      return;
    }

    let parameter = {
      cityId: this.selectIdKabupaten,
      cityName: this.selectNamaKabupaten,
      countryId: this.selectIdNegara,
      countryNameIdn: this.selectNamaNegara,
      districtId: this.idKecamatan,
      districtName: this.namaKecamatan,
      provinceId: this.selectIdProvinsi,
      provinceName: this.selectNamaProvinsi,
      villageId: this.idKelurahan,
      villageName: this.namaKelurahan,
      villagePostalCode: this.kodePos,
      updatedBy: this.nik,
    };

    this.wilayahService
      .putIdc(
        'village',
        parameter,
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe(
        (res) => {
          this.handleSuccessResponse(res);
          console.log(res);
        },
        (error) => {
          console.log(error.status);
          let errorText = error.error.status.responseDesc;
          this.handleErrors(error);
          console.log(error);
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

  changeStatus() {
    let kelurahanId = this.id;
    let nik = this.nik;
    let title: string = '';
    let parameter = {};
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
      if (result.isConfirmed) {
        if (this.flag === true) {
          console.log(this.flag);

          this.wilayahService
            .putIdc(
              'village/' + kelurahanId + '/' + nik,
              parameter,
              this.httpOptions,
              catchError(this.handleError.handleErrorDetailUser.bind(this))
            )
            .subscribe(
              (res) => this.handleSuccessResponse(res),
              (error) => this.handleErrors(error)
            );
        } else if (this.flag === false) {
          console.log(this.flag);

          this.wilayahService
            .deleteAllc(
              'village/' + kelurahanId + '/' + nik,
              this.httpOptions,
              catchError(this.handleError.handleErrorDetailUser.bind(this))
            )
            .subscribe(
              (res) => this.handleSuccessResponse(res),
              (error) => this.handleErrors(error)
            );
        }
      }
    });
  }

  handleValidationErrors() {
    if (this.formValidasi.controls.namaKelurahan.errors?.required) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tolong isi Nama Kelurahan',
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (this.formValidasi.controls.namaKelurahan.errors?.pattern) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Isi Nama Kelurahan salah',
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (this.formValidasi.controls.kodePos.errors?.required) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tolong isi Kode Pos',
        showConfirmButton: false,
        timer: 2000,
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
        timer: 2000,
      });
    } else if (this.formValidasi.controls.namaKecamatan.errors?.required) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Tolong pilih Kecamatan',
        showConfirmButton: false,
        timer: 2000,
      });
    }
    return;
  }

  handleSuccessResponse(res: any) {
    let statusCode = res.body.status.responseCode;
    let statusDesc = res.body.status.responseDesc;
    if (statusCode == '200') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: statusDesc,
        showConfirmButton: false,
        timer: 2000,
      }).then((res) => {
        if (res) {
          this.router.navigate(['/wilayah-kelurahan-auth/' + this.token]);
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
  }

  handleErrors(error: any) {
    const errorText =
      error.status === '400'
        ? error.error.status.responseDesc
        : 'Service Unavailable';

    if (error.status !== '400') {
      this.showSwalError(errorText);
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: errorText,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  showSwalError(errorText: string) {
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
      title: errorText,
    });
  }
}
