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
  ip = 'http://172.25.13.91/API_COBRANZA/c_registro/';
  apigetUser: string = this.ip + 'getUser';
  apigetRol: string = this.ip + 'getRol';
  apigetDocumento: string = this.ip + 'getDocumento';
  apigetSexo: string = this.ip + 'getSexo';
  apigetCodigoUser: string = this.ip + 'getCodigoUser';
  apicreateUser: string = this.ip + 'createUser';
  apigetUserUpdate: string = this.ip + 'UserUpdate';
  apigetUserDelete: string = this.ip + 'UserDelete';
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

  UserDelete(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetUserDelete, dato, httpOptions)
      .pipe(map(results => results));
  }


  getRol(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetRol, httpOptions)
      .pipe(map(results => results));
  }

  getDocumento(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetDocumento, httpOptions)
      .pipe(map(results => results));
  }

  getSexo(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetSexo, httpOptions)
      .pipe(map(results => results));
  }

  getCodigoUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetCodigoUser, httpOptions)
      .pipe(map(results => results));
  }

  createUser(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apicreateUser, dato, httpOptions)
      .pipe(map(results => results));
  }
}
