import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../services/login/login.service';
import { ClienteService } from '../../../services/cliente/cliente.service';
declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  dtOptions: any = {};
  usuarios: any;
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
  constructor(private userServ: ClienteService,
    private loginServ: LoginService,
    public fb: FormBuilder) {
    this.formularioUsuario = this.fb.group({
      codigo: ['', [Validators.required]],
      id_rol: ['', [Validators.required]],
      puesto: ['', [Validators.required]],
      id_usuario: ['', []],
      id_documento: ['', [Validators.required]],
      numero_doc: ['', [Validators.required, Validators.pattern(/^[1-9]\d{7,12}$/)]],
      id_sexo: ['', [Validators.required]],
      nombres: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      apellido_pat: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      apellido_mat: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]/)]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    $(document).ready(function () {
      $('#tabla_usuarios_filter').css('display', 'none');
      $('#tabla_usuarios_length').css('display', 'none');
      // Button PDF
    });
    this.listarUser();
  }


  listarUser() {
    this.usuarios = [];
    this.userServ.getCliente().subscribe((data => {
      this.usuarios = data;
      this.data = data;
    }));
  }

  initializeItems() {
    this.usuarios = this.data;
  }

  buscarUser(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.usuarios = this.usuarios.filter((usuario: any) => {
        return (usuario.user.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarCodigo(ev: any) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.usuarios = this.usuarios.filter((usuario: any) => {
        return (usuario.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarEstado(ev: any) {
    console.log(ev);
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.usuarios = this.usuarios.filter((usuario: any) => {
        return (usuario.id_estado.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }


  btnAgregar() {
    this.formularioUsuario.controls.id_rol.setValue('SOCIO');
    this.estado = false;
    this.getRol();
    this.getDocumento();
    this.getSexo();
    this.getCodigoUser();
    this.cabecera = 'AGREGAR NUEVO CLIENTE';
    document.getElementById('openModalButton').click();
  }

  agregarUser() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    // console.log(this.formularioUsuario.value);
    this.loginServ.countUser({ user: this.formularioUsuario.value.user }).subscribe((data => {
      if (data[0]['total'] === "0") {
        this.userServ.createCliente(this.formularioUsuario.value).subscribe((data) => {
          Swal.close();
          console.log(data);
          if (data === true) {
            this.listarUser();
            $('#myModal').modal('hide');
            Swal.fire(
              'Registrado',
              'Se registro correctamente el cliente',
              'success'
            );
            console.log('true');
          } else {
            Swal.fire({
              type: 'error',
              title: 'Error',
              text: 'Hubo un problema al registrarlo',
            });
            console.log('false');
          }
        });
      } else {
        Swal.close();
        Swal.fire({
          type: 'warning',
          title: 'Error',
          text: 'USER YA REGISTRADO',
        });
      }
    }));
  }

  async btnEditar(id) {
    console.log(id);
    this.id = id;
    this.estado = true;
    this.formularioUsuario.controls.id_rol.setValue('SOCIO');
    await this.getDocumento();
    await this.getSexo();
    this.cabecera = 'EDITAR CLIENTE #' + id;
    $('#myModal').modal('show');
    await this.loginServ.getCliente({ id }).subscribe((data => {
      console.log(data);
      const user = data[0];
      this.formularioUsuario.controls.id_usuario.setValue(user.id_usuario);
      this.formularioUsuario.controls.codigo.setValue(user.codigo);
      this.formularioUsuario.controls.puesto.setValue(user.puesto);
      this.formularioUsuario.controls.id_documento.setValue(user.id_documento);
      this.formularioUsuario.controls.numero_doc.setValue(user.numero_doc);
      this.formularioUsuario.controls.id_sexo.setValue(user.id_sexo);
      this.formularioUsuario.controls.nombres.setValue(user.nombres);
      this.formularioUsuario.controls.apellido_pat.setValue(user.apellido_pat);
      this.formularioUsuario.controls.apellido_mat.setValue(user.apellido_mat);
      this.formularioUsuario.controls.user.setValue(user.user);
      this.formularioUsuario.controls.password.setValue(user.password);
    }));
  }

  actualizar(id) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    // console.log(this.formularioUsuario.value);
    this.userServ.ClienteUpdate(this.formularioUsuario.value).subscribe((data) => {
      Swal.close();
      console.log(data);
      if (data === true) {
        this.listarUser();
        $('#myModal').modal('hide');
        Swal.fire(
          'Actualizado',
          'Se actualizo correctamente el cliente',
          'success'
        );
        console.log('true');
      } else {
        Swal.fire({
          type: 'error',
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
        this.userServ.ClienteDelete({ id }).subscribe((data => {
          Swal.close();
          if (data === true) {
            this.listarUser();
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

  obtenerUser() {
    const use1 = this.formularioUsuario.value.nombres.charAt(0);
    const use2 = this.formularioUsuario.value.nombres.charAt(1);
    const use3 = this.formularioUsuario.value.apellido_pat;
    const use4 = this.formularioUsuario.value.apellido_mat.charAt(0);
    const user = use1 + use2 + use3 + use4;
    this.formularioUsuario.controls.user.setValue(user);
    console.log(use1 + use2 + use3 + use4);
  }

  getRol() {
    this.userServ.getRol().subscribe((rol) => {
      this.roles = rol;
      console.log(rol);
    });
  }

  getDocumento() {
    this.userServ.getDocumento().subscribe((documento) => {
      this.documentos = documento;
      console.log(documento);
    });
  }

  getSexo() {
    this.userServ.getSexo().subscribe((sexo) => {
      this.sexos = sexo;
      console.log(sexo);
    });
  }

  getCodigoUser() {
    this.userServ.getCodigoCliente().subscribe((codigo) => {
      console.log(codigo);
      const cod = parseInt(codigo[0].total);
      this.codigo = 'CLN000' + (cod + 1);
      this.formularioUsuario.controls.codigo.setValue(this.codigo);
    });
  }

}
