import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  datos: any;
  // ip = 'http://172.25.13.91/API_SENAMHI/App_movil/';
  ip = 'http://172.25.13.91/API_COBRANZA/c_registro/';
  apigetCliente: string = this.ip + 'getCliente';
  apigetRol: string = this.ip + 'getRol';
  apigetDocumento: string = this.ip + 'getDocumento';
  apigetSexo: string = this.ip + 'getSexo';
  apigetCodigoCliente: string = this.ip + 'getCodigoCliente';
  apicreateCliente: string = this.ip + 'createCliente';
  apigetClienteUpdate: string = this.ip + 'ClienteUpdate';
  apigetClienteDelete: string = this.ip + 'ClienteDelete';
  constructor(public http: HttpClient) { }

  getCliente(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetCliente, httpOptions)
      .pipe(map(results => results));
  }

  ClienteUpdate(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetClienteUpdate, dato, httpOptions)
      .pipe(map(results => results));
  }

  ClienteDelete(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetClienteDelete, dato, httpOptions)
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

  getCodigoCliente(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetCodigoCliente, httpOptions)
      .pipe(map(results => results));
  }

  createCliente(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apicreateCliente, dato, httpOptions)
      .pipe(map(results => results));
  }
}
