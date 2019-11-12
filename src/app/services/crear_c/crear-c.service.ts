import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrearCService {

  datos: any;
  ip = 'http://127.0.0.1/API_COBRANZA/c_convenio/';
  apigetConvenio: string = this.ip + 'getConvenio';
  apigetCountConvenio: string = this.ip + 'getCountConvenio';
  apiCreateConvenio: string = this.ip + 'createConvenio';
  apigetConvenioId: string = this.ip + 'getConvenioId';
  apigetConveniodetalleId: string = this.ip + 'getConveniodetalleId';
  apigUpdateConvenioId: string = this.ip + 'UpdateConvenioId';
  apigDeleteConvenioId: string = this.ip + 'DeleteConvenioId';
  apigPagarConvenioId: string = this.ip + 'PagarConvenioId';
  apigetMora: string = this.ip + 'getMora';
  apigetHistorial: string = this.ip + 'getHistorial';
  apigetImprimir: string = this.ip + 'getImprimir';
  apigetCuotaPagadas: string = this.ip + 'getCuotaPagadas';
  apigetValidar: string = this.ip + 'getValidar';
  apigetConvenioSocioId: string = this.ip + 'getConvenioSocioId';
  apisendEmail: string = this.ip + 'sendEmail';
  constructor(public http: HttpClient) { }

  sendEmail(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apisendEmail, dato, httpOptions)
      .pipe(map(results => results));
  }

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

  getConvenioSocioId(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetConvenioSocioId, dato, httpOptions)
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

  PagarConvenioId(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigPagarConvenioId, dato, httpOptions)
      .pipe(map(results => results));
  }

  getMora(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .get(this.apigetMora, httpOptions)
      .pipe(map(results => results));
  }

  getHistorial(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetHistorial, dato, httpOptions)
      .pipe(map(results => results));
  }

  getImprimir(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetImprimir, dato, httpOptions)
      .pipe(map(results => results));
  }

  getCuotaPagadas(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetCuotaPagadas, dato, httpOptions)
      .pipe(map(results => results));
  }

  getValidar(dato): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetValidar, dato, httpOptions)
      .pipe(map(results => results));
  }
}
