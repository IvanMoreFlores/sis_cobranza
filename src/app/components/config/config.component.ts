import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  usuario: any;
  contra: String;
  cofircontra: String;

  constructor(private loginServi: LoginService) { }

  ngOnInit() {
    this.loginServi.getUser({ id: localStorage.getItem('id') }).subscribe((data => {
      console.log(data);
      this.usuario = data[0];
    }));
  }

  btnUpdate() {

    if (this.contra === '' || this.cofircontra === '') {
      alert('Complete los campos');
    } else {
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      if (this.contra !== this.cofircontra) {
        Swal.close();
        Swal.fire({
          type: 'error',
          title: 'Mensaje',
          text: 'La contraseña no coincide'
        });
      } else {
        if (this.contra.length > 8) {
          this.loginServi.UserUpdate({ id: localStorage.getItem('id'), password: this.contra }).subscribe((data => {
            Swal.close();
            console.log(data);
            if (data === true) {
              Swal.fire({
                type: 'success',
                title: 'Mensaje',
                text: 'La contraseña se actualizo correctamente'
              });
            }
          }));
        } else {
          Swal.fire({
            type: 'error',
            title: 'Mensaje',
            text: 'La contraseña muy corta minimo 8 caracteres'
          });
        }
      }
    }
  }

}
