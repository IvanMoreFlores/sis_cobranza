import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {

    if (localStorage.getItem('id')) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
