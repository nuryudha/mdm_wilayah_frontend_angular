import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AlfabetOnlyDirective } from './directives/alfabet-only.directive';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthCheckComponent } from './component/auth-check/auth-check.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CreateKabupatenAuthComponent } from './component/wilayah-kabupaten-auth/create-kabupaten-auth/create-kabupaten-auth.component';
import { CreateKabupatenComponent } from './component/wilayah-kabupaten/create-kabupaten/create-kabupaten.component';
import { CreateKecamatanAuthComponent } from './component/wilayah-kecamatan-auth/create-kecamatan-auth/create-kecamatan-auth.component';
import { CreateKecamatanComponent } from './component/wilayah-kecamatan/create-kecamatan/create-kecamatan.component';
import { CreateKelurahanAuthComponent } from './component/wilayah-kelurahan-auth/create-kelurahan-auth/create-kelurahan-auth.component';
import { CreateKelurahanComponent } from './component/wilayah-kelurahan/create-kelurahan/create-kelurahan.component';
import { CreateNegaraAuthComponent } from './component/wilayah-negara-auth/create-negara-auth/create-negara-auth.component';
import { CreateNegaraComponent } from './component/wilayah-negara/create-negara/create-negara.component';
import { CreateProvinsiAuthComponent } from './component/wilayah-provinsi-auth/create-provinsi-auth/create-provinsi-auth.component';
import { CreateProvinsiComponent } from './component/wilayah-provinsi/create-provinsi/create-provinsi.component';
import { DataKabupatenComponent } from './component/wilayah-kecamatan/data-kabupaten/data-kabupaten.component';
import { DataKecamatanComponent } from './component/wilayah-kelurahan/data-kecamatan/data-kecamatan.component';
import { DataProvinsiComponent } from './component/wilayah-kabupaten/data-provinsi/data-provinsi.component';
import { EditKabupatenAuthComponent } from './component/wilayah-kabupaten-auth/edit-kabupaten-auth/edit-kabupaten-auth.component';
import { EditKabupatenComponent } from './component/wilayah-kabupaten/edit-kabupaten/edit-kabupaten.component';
import { EditKecamatanAuthComponent } from './component/wilayah-kecamatan-auth/edit-kecamatan-auth/edit-kecamatan-auth.component';
import { EditKecamatanComponent } from './component/wilayah-kecamatan/edit-kecamatan/edit-kecamatan.component';
import { EditKelurahanAuthComponent } from './component/wilayah-kelurahan-auth/edit-kelurahan-auth/edit-kelurahan-auth.component';
import { EditKelurahanComponent } from './component/wilayah-kelurahan/edit-kelurahan/edit-kelurahan.component';
import { EditNegaraAuthComponent } from './component/wilayah-negara-auth/edit-negara-auth/edit-negara-auth.component';
import { EditNegaraComponent } from './component/wilayah-negara/edit-negara/edit-negara.component';
import { EditProvinsiAuthComponent } from './component/wilayah-provinsi-auth/edit-provinsi-auth/edit-provinsi-auth.component';
import { EditProvinsiComponent } from './component/wilayah-provinsi/edit-provinsi/edit-provinsi.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { WilayahKabupatenAuthComponent } from './component/wilayah-kabupaten-auth/wilayah-kabupaten-auth.component';
import { WilayahKabupatenComponent } from './component/wilayah-kabupaten/wilayah-kabupaten.component';
import { WilayahKecamatanAuthComponent } from './component/wilayah-kecamatan-auth/wilayah-kecamatan-auth.component';
import { WilayahKecamatanComponent } from './component/wilayah-kecamatan/wilayah-kecamatan.component';
import { WilayahKelurahanAuthComponent } from './component/wilayah-kelurahan-auth/wilayah-kelurahan-auth.component';
import { WilayahKelurahanComponent } from './component/wilayah-kelurahan/wilayah-kelurahan.component';
import { WilayahNegaraAuthComponent } from './component/wilayah-negara-auth/wilayah-negara-auth.component';
import { WilayahNegaraComponent } from './component/wilayah-negara/wilayah-negara.component';
import { WilayahProvinsiAuthComponent } from './component/wilayah-provinsi-auth/wilayah-provinsi-auth.component';
import { WilayahProvinsiComponent } from './component/wilayah-provinsi/wilayah-provinsi.component';

@NgModule({
  declarations: [
    AppComponent,
    WilayahNegaraComponent,
    WilayahProvinsiComponent,
    CreateNegaraComponent,
    EditNegaraComponent,
    NumberOnlyDirective,
    AlfabetOnlyDirective,
    CreateProvinsiComponent,
    EditProvinsiComponent,
    WilayahKabupatenComponent,
    WilayahKelurahanComponent,
    WilayahKecamatanComponent,
    CreateKabupatenComponent,
    EditKabupatenComponent,
    CreateKecamatanComponent,
    EditKecamatanComponent,
    CreateKelurahanComponent,
    EditKelurahanComponent,
    DataKabupatenComponent,
    DataKecamatanComponent,
    DataProvinsiComponent,
    AuthCheckComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    WilayahNegaraAuthComponent,
    CreateNegaraAuthComponent,
    EditNegaraAuthComponent,
    WilayahProvinsiAuthComponent,
    WilayahKabupatenAuthComponent,
    WilayahKecamatanAuthComponent,
    WilayahKelurahanAuthComponent,
    CreateProvinsiAuthComponent,
    EditProvinsiAuthComponent,
    CreateKabupatenAuthComponent,
    EditKabupatenAuthComponent,
    CreateKecamatanAuthComponent,
    EditKecamatanAuthComponent,
    EditKelurahanAuthComponent,
    CreateKelurahanAuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
