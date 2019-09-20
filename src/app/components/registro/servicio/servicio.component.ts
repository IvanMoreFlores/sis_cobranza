import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service';
import { ServicioService } from '../../../services/servicio/servicio.service';
declare var $: any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {
  dtOptions: any = {};
  servicios: any;
  roles: any;
  documentos: any;
  sexos: any;
  users: any;
  titulo: String;
  codigo: String;
  cabecera: String;
  estado: Boolean;
  id: any;
  persons: any;
  data: any = [];
  formularioUsuario: FormGroup;
  constructor(private userServ: ServicioService,
    private loginServ: LoginService,
    public fb: FormBuilder) {
    this.formularioUsuario = this.fb.group({
      id_servicio: ['', []],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      descripcion: ['', [Validators.required]],
      id_periodo: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.pattern(/^[1-9]\d{1,4}$/)]],
      // user: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#tabla_usuarios_filter').css('display', 'none');
      $('#tabla_usuarios_length').css('display', 'none');
      // Button PDF
    });
    this.listarServicio();
  }

  listarServicio() {
    this.servicios = [];
    this.userServ.getServicio().subscribe((data => {
      this.servicios = data;
      this.data = data;
    }));
  }

  initializeItems() {
    this.servicios = this.data;
  }

  buscarServicio(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.servicios = this.servicios.filter((servicio: any) => {
        return (servicio.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarCodigo(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.servicios = this.servicios.filter((servicio: any) => {
        return (servicio.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarEstado(ev: any) {
    console.log(ev);
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.servicios = this.servicios.filter((servicio: any) => {
        return (servicio.id_estado.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  btnAgregar() {
    this.estado = false;
    this.getCodigoService();
    this.cabecera = 'AGREGAR NUEVO SERVICIO';
    document.getElementById('openModalButton').click();
  }

  getCodigoService() {
    this.userServ.getCodigoServicio().subscribe((codigo) => {
      console.log(codigo);
      const cod = parseInt(codigo[0].total);
      this.codigo = 'SERV0000' + (cod + 1);
      this.formularioUsuario.controls.codigo.setValue(this.codigo);
    });
  }

  agregarServicio() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.userServ.ServicioCreate(this.formularioUsuario.value).subscribe((data) => {
      Swal.close();
      console.log(data);
      if (data === true) {
        this.listarServicio();
        $('#myModal').modal('hide');
        Swal.fire(
          'Registrado',
          'Se registro correctamente el servicio',
          'success'
        );
        console.log('true');
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Error',
          text: 'Hubo un problema al registrarlo',
        });
        console.log('false');
      }
    });
  }

  async btnEditar(id) {
    this.estado = true;
    this.cabecera = 'EDITAR SERVICIO #' + id;
    $('#myModal').modal('show');
    await this.userServ.getServicioId({ id: id }).subscribe((data => {
      console.log(data);
      const user = data[0];
      this.formularioUsuario.controls.id_servicio.setValue(user.id_servicio);
      this.formularioUsuario.controls.codigo.setValue(user.codigo);
      this.formularioUsuario.controls.nombre.setValue(user.nombre);
      this.formularioUsuario.controls.descripcion.setValue(user.descripcion);
      this.formularioUsuario.controls.id_periodo.setValue(user.id_periodo);
      this.formularioUsuario.controls.monto.setValue(user.monto);
    }));
  }

  actualizar(id) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.userServ.ServicioUpdate(this.formularioUsuario.value).subscribe((data) => {
      Swal.close();
      console.log(data);
      if (data === true) {
        this.listarServicio();
        $('#myModal').modal('hide');
        Swal.fire(
          'Registrado',
          'Se actualizo correctamente el servicio',
          'success'
        );
        console.log('true');
      } else {
        Swal.fire({
          type: 'warning',
          title: 'Error',
          text: 'Hubo un problema al actualizar',
        });
        console.log('false');
      }
    });
  }

  btnEliminar(id) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'No podrás revertir esto',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          type: 'info',
          text: 'Espere por favor...'
        });
        Swal.showLoading();
        this.userServ.ServicioDelete({ id: id }).subscribe((data => {
          Swal.close();
          if (data === true) {
            this.listarServicio();
            Swal.fire(
              'Eliminado!',
              'Su registro ha sido eliminado.',
              'success'
            );
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar',
            });
          }
        }));
      }
    });
  }
}
