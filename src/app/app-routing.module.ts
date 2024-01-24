import { RouterModule, Routes } from '@angular/router';

import { AuthCheckComponent } from './component/auth-check/auth-check.component';
import { AuthGuard } from './guard/auth.guard';
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
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth/:token', component: AuthCheckComponent },
  {
    // ! Negara Authentication
    path: 'wilayah-negara-auth/:token',
    component: WilayahNegaraAuthComponent,
  },
  {
    // Data Negara
    path: 'wilayah-negara',
    canActivate: [AuthGuard],
    component: WilayahNegaraComponent,
  },
  {
    // Buat Negara Authentication
    path: 'create-negara-auth/:token',
    component: CreateNegaraAuthComponent,
  },
  {
    // Buat Negara
    path: 'create-negara',
    canActivate: [AuthGuard],
    component: CreateNegaraComponent,
  },
  {
    // Edit Negara Authentication
    path: 'edit-negara-auth/:id/:token',
    component: EditNegaraAuthComponent,
  },
  {
    // Edit Negara
    path: 'edit-negara/:id',
    canActivate: [AuthGuard],
    component: EditNegaraComponent,
  },
  {
    // ! Provinsi Authentication
    path: 'wilayah-provinsi-auth/:token',
    component: WilayahProvinsiAuthComponent,
  },
  {
    // Data Provinsi
    path: 'wilayah-provinsi',
    canActivate: [AuthGuard],
    component: WilayahProvinsiComponent,
  },
  {
    // Buat Provinsi Authentication
    path: 'create-provinsi-auth/:token',
    component: CreateProvinsiAuthComponent,
  },
  {
    // Buat provinsi
    path: 'create-provinsi',
    canActivate: [AuthGuard],
    component: CreateProvinsiComponent,
  },
  {
    // Edit Provinsi Authentication
    path: 'edit-provinsi-auth/:id/:token',
    component: EditProvinsiAuthComponent,
  },
  {
    // Edit provinsi
    path: 'edit-provinsi/:id',
    canActivate: [AuthGuard],
    component: EditProvinsiComponent,
  },
  {
    // ! Kabupaten Authentication
    path: 'wilayah-kabupaten-auth/:token',
    component: WilayahKabupatenAuthComponent,
  },
  {
    // Data Kabupaten
    path: 'wilayah-kabupaten',
    canActivate: [AuthGuard],
    component: WilayahKabupatenComponent,
  },
  {
    // Buat Kabupaten Authentication
    path: 'create-kabupaten-auth/:token',
    component: CreateKabupatenAuthComponent,
  },
  {
    // Buat Kabupaten
    path: 'create-kabupaten',
    canActivate: [AuthGuard],
    component: CreateKabupatenComponent,
  },
  {
    // Edit Kabupaten Authentication
    path: 'edit-kabupaten-auth/:id/:token',
    component: EditKabupatenAuthComponent,
  },
  {
    // Edit Kabupaten
    path: 'edit-kabupaten/:id',
    canActivate: [AuthGuard],
    component: EditKabupatenComponent,
  },
  {
    // ! Kecamatan Authentication
    path: 'wilayah-kecamatan-auth/:token',
    component: WilayahKecamatanAuthComponent,
  },
  {
    // Data Kecamatan
    path: 'wilayah-kecamatan',
    canActivate: [AuthGuard],
    component: WilayahKecamatanComponent,
  },
  {
    // Buat Kecamatan Authentication
    path: 'create-kecamatan-auth/:token',
    component: CreateKecamatanAuthComponent,
  },
  {
    // Buat Kecamatan
    path: 'create-kecamatan',
    canActivate: [AuthGuard],
    component: CreateKecamatanComponent,
  },
  {
    // Edit Kecamatan Authentication
    path: 'edit-kecamatan-auth/:id/:token',
    component: EditKecamatanAuthComponent,
  },
  {
    // Edit Kecamatan
    path: 'edit-kecamatan/:id',
    canActivate: [AuthGuard],
    component: EditKecamatanComponent,
  },
  {
    // ! Kelurahan Authentication
    path: 'wilayah-kelurahan-auth/:token',
    component: WilayahKelurahanAuthComponent,
  },
  {
    // Data Kelurahan
    path: 'wilayah-kelurahan',
    canActivate: [AuthGuard],
    component: WilayahKelurahanComponent,
  },
  {
    // Buat Kelurahan Authentication
    path: 'create-kelurahan-auth/:token',
    component: CreateKelurahanAuthComponent,
  },
  {
    // Buat Kelurahan
    path: 'create-kelurahan',
    canActivate: [AuthGuard],
    component: CreateKelurahanComponent,
  },
  {
    // Edit Kelurahan Authentication
    path: 'edit-kelurahan-auth/:id/:token',
    component: EditKelurahanAuthComponent,
  },
  {
    // Edit Kelurahan
    path: 'edit-kelurahan/:id',
    canActivate: [AuthGuard],
    component: EditKelurahanComponent,
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
