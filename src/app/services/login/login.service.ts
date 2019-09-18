import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  datos: any;
  // ip = 'http://172.25.13.91/API_SENAMHI/App_movil/';
  ip = 'http://172.25.13.91/API_COBRANZA/c_login/';
  apiLogin: string = this.ip + 'Login';
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

}
