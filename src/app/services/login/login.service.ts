import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  datos: any;
  ip = 'http://127.0.0.1/API_COBRANZA/c_login/';
  apiLogin: string = this.ip + 'Login';
  apigetUser: string = this.ip + 'getUser';
  apigetCliente: string = this.ip + 'getCliente';
  apigetUserUpdate: string = this.ip + 'UserUpdate';
  apigetCountUser: string = this.ip + 'CountUser';
  apigetcountCiente: string = this.ip + 'countCiente';
  constructor(public http: HttpClient) { }

  Login(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apiLogin, dato, httpOptions)
      .pipe(map(results => results));
  }

  countCiente(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetcountCiente, dato, httpOptions)
      .pipe(map(results => results));
  }

  countUser(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetCountUser, dato, httpOptions)
      .pipe(map(results => results));
  }

  getCliente(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetCliente, dato, httpOptions)
      .pipe(map(results => results));
  }

  getUser(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetUser, dato, httpOptions)
      .pipe(map(results => results));
  }

  UserUpdate(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetUserUpdate, dato, httpOptions)
      .pipe(map(results => results));
  }
}
