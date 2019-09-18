import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  datos: any;
  // ip = 'http://172.25.13.91/API_SENAMHI/App_movil/';
  ip = 'http://172.25.13.91/API_SENAMHI/App_movil/';
  apigetUser: string = this.ip + 'getUser';
  // tslint:disable-next-line: variable-name
  // api_login: string = this.ip + 'getLogin';
  // tslint:disable-next-line: variable-name
  // api_recover_pass: string = this.ip + 'recoverPass';
  constructor(public http: HttpClient) { }

  getUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetUser, httpOptions)
      .pipe(map(results => results));
  }

  // login(dato: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Accept: 'application/json',
  //     }),
  //   };
  //   return this.http
  //     .post(this.api_login, dato, httpOptions)
  //     .pipe(map(results => results));
  // }

  // recoverPass(dato: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       Accept: 'application/json',
  //     }),
  //   };
  //   return this.http
  //     .post(this.api_recover_pass, dato, httpOptions)
  //     .pipe(map(results => results));
  // }
}

