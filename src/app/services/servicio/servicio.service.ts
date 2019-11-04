import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  datos: any;
  ip = 'http://127.0.0.1/API_COBRANZA/c_registro/';
  apigetServicio: string = this.ip + 'getServicio';
  apigetCodigoServicio: string = this.ip + 'getCodigoServicio';
  apiServicioCreate: string = this.ip + 'ServicioCreate';
  apigetServicioId: string = this.ip + 'getServicioId';
  apiServicioUpdate: string = this.ip + 'ServicioUpdate';
  apiServicioDelete: string = this.ip + 'ServicioDelete';
  constructor(public http: HttpClient) { }

  getServicio(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetServicio, httpOptions)
      .pipe(map(results => results));
  }

  getCodigoServicio(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetCodigoServicio, httpOptions)
      .pipe(map(results => results));
  }

  getServicioId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetServicioId, dato, httpOptions)
      .pipe(map(results => results));
  }

  ServicioCreate(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apiServicioCreate, dato, httpOptions)
      .pipe(map(results => results));
  }

  ServicioUpdate(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apiServicioUpdate, dato, httpOptions)
      .pipe(map(results => results));
  }

  ServicioDelete(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apiServicioDelete, dato, httpOptions)
      .pipe(map(results => results));
  }



}
