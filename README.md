# MdmWilayahFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## Notes Commit

maintenance_token_2
commit : penyesuaian penggunaan service di ui wilayah dan loading data
desc :

1. pada bagian kelurahan sudah optimal pada bagian get atau tampilan awal baik search juga sudah ada loading dan pakai await jadi datanya harus menunggu di get 1 1 . jadi minim error mungkin tapi kalau mau di perbaiki mungkin dibuat reusable pada beberapa bagian karena masih mengulang
2. pada bagian edit juga sudah optimal menggunakan await yang datanya harus menunggu dahulu supaya data dapat disentuh. mungkin kedepannya harus menerapkan juga di edit kelurahan
3. untuk data kecamatan di keluarahan juga perlu di optimalkan
4. SETELAH SELESAI maka bisa dibuild dulu di dev. tapi tentu saja demo dulu ke backend

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
