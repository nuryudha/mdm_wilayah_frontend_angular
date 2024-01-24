import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions: Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  observe: 'response',
  responseType: 'json',
};
@Injectable({
  providedIn: 'root',
})
export class WilayahService {
  urlSkeleton = environment.urlSkeleton;

  constructor(private http: HttpClient) {}

  detailUser(
    endPoint: string,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.detailUser + endPoint, httpHeaders)
      .pipe(catchError);
  }

  getAllc(
    endpoint: string,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.wilayah + endpoint, httpHeaders)
      .pipe(catchError);
  }
  putIdc(
    endpoint: string,
    parameter: any,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .put<any>(environment.wilayah + endpoint, parameter, httpHeaders)
      .pipe(catchError);
  }
  postAllc(
    endpoint: string,
    parameter: any,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .post<any>(environment.wilayah + endpoint, parameter, httpHeaders)
      .pipe(catchError);
  }
  deleteAllc(
    endpoint: string,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .delete<any>(environment.wilayah + endpoint, httpHeaders)
      .pipe(catchError);
  }
  getIdc(
    endpoint: string,
    httpHeaders: any,
    catchError: any
  ): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(environment.wilayah + endpoint, httpHeaders)
      .pipe(catchError);
  }

  // ! NO USE SERVICE
  // getAll(endpoint: string): Observable<HttpResponse<any>> {
  //   return this.http
  //     .get<any>(environment.wilayah + endpoint, httpOptions)
  //     .pipe();
  // }

  // postAll(endpoint: string, parameter: any): Observable<HttpResponse<any>> {
  //   return this.http
  //     .post<any>(environment.wilayah + endpoint, parameter, httpOptions)
  //     .pipe();
  // }

  // deleteAll(endpoint: string): Observable<HttpResponse<any>> {
  //   return this.http
  //     .delete<any>(environment.wilayah + endpoint, httpOptions)
  //     .pipe();
  // }

  // getId(endpoint: string): Observable<HttpResponse<any>> {
  //   return this.http
  //     .get<any>(environment.wilayah + endpoint, httpOptions)
  //     .pipe();
  // }

  // putId(endpoint: string, parameter: any): Observable<HttpResponse<any>> {
  //   return this.http
  //     .put<any>(environment.wilayah + endpoint, parameter, httpOptions)
  //     .pipe();
  // }
}
