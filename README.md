# MdmWilayahFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Notes Commit

branch : maintenance_token_2
commit : penyesuaian penggunaan service di ui wilayah dan loading data
desc :

1. pada bagian kelurahan sudah optimal pada bagian get atau tampilan awal baik search juga sudah ada loading dan pakai await jadi datanya harus menunggu di get 1 1 . jadi minim error mungkin tapi kalau mau di perbaiki mungkin dibuat reusable pada beberapa bagian karena masih mengulang
2. pada bagian edit juga sudah optimal menggunakan await yang datanya harus menunggu dahulu supaya data dapat disentuh. mungkin kedepannya harus menerapkan juga di create kelurahan
3. untuk data kecamatan di keluarahan juga perlu di optimalkan
4. SETELAH SELESAI maka bisa dibuild dulu di dev. tapi tentu saja demo dulu ke backend


branch : maintenance_token_2
commit : Maintenance tiket #172901 Done
desc :

1. Semua bagian di tiket sudah done termasuk penggunana tanda baca  ./-() . selain itu untuk non aktif dan aktif di kelurahan. juga minimal dan maksimal kode pos 5 karakter
2. Untuk selanjutnya melakukan penyesuaian loading di tiap wilayah tertama saat get data. ini yang diutamakan dulu
3. pengoptimalan await di tiap wilayah

branch : maintenance_token_2
commit : Pengoptimalan untuk loading dan perubahan i fa fas untuk ikon menjadi lokal
desc :

1. Semua loading sudah diterapkan untuk tiap wilayah dan perubahan i fas . 
2. Kurang pengoptimalan pada status await di tiap wilayah

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
