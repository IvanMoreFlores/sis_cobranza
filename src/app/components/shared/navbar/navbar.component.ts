import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  nombre: String;
  rol: String;
  constructor(private router: Router) { }

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre');
    this.rol = localStorage.getItem('rol');
  }

  btnSalir() {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Usted cerrara sesión',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        localStorage.clear()
        this.router.navigateByUrl('/login');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire(
        //   'Cancelled',
        //   'Your imaginary file is safe :)',
        //   'error'
        // )
      }
    })
  }

}
