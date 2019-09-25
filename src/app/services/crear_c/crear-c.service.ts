import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrearCService {

  datos: any;
  ip = 'http://172.25.13.91/API_COBRANZA/c_convenio/';
  apigetConvenio: string = this.ip + 'getConvenio';
  apigetCountConvenio: string = this.ip + 'getCountConvenio';
  apiCreateConvenio: string = this.ip + 'createConvenio';
  apigetConvenioId: string = this.ip + 'getConvenioId';
  apigetConveniodetalleId: string = this.ip + 'getConveniodetalleId';
  apigUpdateConvenioId: string = this.ip + 'UpdateConvenioId';
  apigDeleteConvenioId: string = this.ip + 'DeleteConvenioId';
  constructor(public http: HttpClient) { }

  getConvenio(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetConvenio, httpOptions)
      .pipe(map(results => results));
  }

  getCountConvenio(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetCountConvenio, httpOptions)
      .pipe(map(results => results));
  }

  createConvenio(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apiCreateConvenio, dato, httpOptions)
      .pipe(map(results => results));
  }

  getConvenioId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetConvenioId, dato, httpOptions)
      .pipe(map(results => results));
  }

  getConveniodetalleId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetConveniodetalleId, dato, httpOptions)
      .pipe(map(results => results));
  }

  UpdateConvenioId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigUpdateConvenioId, dato, httpOptions)
      .pipe(map(results => results));
  }

  DeleteConvenioId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigDeleteConvenioId, dato, httpOptions)
      .pipe(map(results => results));
  }
}
