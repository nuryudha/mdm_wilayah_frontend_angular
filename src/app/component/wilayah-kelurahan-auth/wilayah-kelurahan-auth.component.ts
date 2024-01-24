import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorRequestService } from 'src/app/shared/handle-error/error-request.service';
import { HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ToggleLoadingService } from 'src/app/shared/loading/toggle-loading.service';
import { WilayahService } from 'src/app/services/wilayah.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-wilayah-kelurahan-auth',
  templateUrl: './wilayah-kelurahan-auth.component.html',
  styleUrls: ['./wilayah-kelurahan-auth.component.css'],
})
export class WilayahKelurahanAuthComponent implements OnInit {
  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private services: WilayahService,
    private toggleLoading: ToggleLoadingService,
    private handleError: ErrorRequestService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Kelurahan Auth Check');
    this.getUrlParameter();
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

  tokenParameter: any;
  urlParameter: any;

  getUrlParameter() {
    this.tokenParameter = this.route.snapshot.params['token'];
    console.log(this.tokenParameter);
    this.httpOptions.headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${this.tokenParameter}`
    );

    if (this.tokenParameter != '') {
      this.getDetailUser();
      console.log('TOKEN : ', this.tokenParameter);
    } else {
      this.router.navigate(['/unauthorized']);
      console.log('TOKEN : ', this.tokenParameter);
    }
  }

  getDetailUser() {
    this.toggleLoading.showLoading(true);
    this.services
      .detailUser(
        'details',
        this.httpOptions,
        catchError(this.handleError.handleErrorDetailUser.bind(this))
      )
      .subscribe((result) => {
        console.log(result);

        if (result.body.status === true) {
          const authLogin = {
            token: this.tokenParameter,
            profileHeader: result.body.data.data.resultUserProfileHeader,
            profileUserRole: result.body.data.data.resultProfileUserRole,
            profilLocation: result.body.data.data.resultUserProfileLocation,
          };
          console.log('true', authLogin);
          localStorage.setItem('auth-user', JSON.stringify(authLogin));
          this.toggleLoading.showLoading(false);
          this.router.navigate(['/wilayah-kelurahan']);
        } else {
          this.toggleLoading.showLoading(false);
          this.router.navigate(['/unauthorized']);
        }
      });
  }
}
