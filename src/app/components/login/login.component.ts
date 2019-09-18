import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: any = {
    user: null,
    password: null
  };

  recordarme = false;
  constructor(public loginServi: LoginService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('id')) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  login(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.loginServi.Login(this.usuario)
      .subscribe(resp => {
        console.log(resp.length);
        if (resp.length > 0) {
          const usuario = resp[0];
          localStorage.setItem('id', usuario.id_usuario);
          localStorage.setItem('nombre', usuario.nombre);
          localStorage.setItem('id_rol', usuario.id_rol);
          localStorage.setItem('rol', usuario.rol);
          Swal.close();
          if (this.recordarme) {
            localStorage.setItem('user', this.usuario.user);
          }
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire({
            type: 'error',
            title: 'Mensaje',
            text: 'No se econtro usuario'
          });
        }

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });
  }

}
