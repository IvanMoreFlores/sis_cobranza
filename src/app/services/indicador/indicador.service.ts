import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  datos: any;
  ip = 'http://172.25.13.91/API_COBRANZA/c_indicador/';
  apigetIndicador_uno: string = this.ip + 'getIndicador_uno';
  apigetIndicador_dos: string = this.ip + 'getIndicador_dos';
  constructor(public http: HttpClient) { }

  getIndicador_uno(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetIndicador_uno, dato, httpOptions)
      .pipe(map(results => results));
  }

  getIndicador_dos(dato: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      }),
    };
    return this.http
      .post(this.apigetIndicador_dos, dato, httpOptions)
      .pipe(map(results => results));
  }
}


