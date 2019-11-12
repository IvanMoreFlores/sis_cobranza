import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { LoginService } from '../../../services/login/login.service';
import { ServicioService } from '../../../services/servicio/servicio.service';
declare var $: any;

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss']
})
export class ServicioComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) table: ElementRef;
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
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];
  constructor(private userServ: ServicioService,
    private loginServ: LoginService,
    public fb: FormBuilder) {
    this.formularioUsuario = this.fb.group({
      id_servicio: ['', []],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z-ñÑ-áéiou]/)]],
      descripcion: ['', [Validators.required]],
      id_periodo: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.pattern(/^([0-9]+\.?[0-9]{0,2})$/)]],
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
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.servicios = [];
    this.userServ.getServicio().subscribe((data => {
      this.servicios = data;
      this.data = data;
      this.setPage(1);
      Swal.close();
      $('#tabla_usuarios_filter').css('display', 'none');
      $('#tabla_usuarios_length').css('display', 'none');
      $('th').removeClass('sorting');
      $('th').removeClass('sorting_asc');
    }));
  }


  setPage(page: number) {
    // get pager object from service
    this.pager = this.getPager(this.servicios.length, page);
    // get current page of items
    this.pagedItems = this.servicios.slice(this.pager.startIndex, this.pager.endIndex + 1);
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

  limpiar() {
    $('#codigo').val('');
    $('#nombre').val('');
    $('#descripcion').val('');
    $('#id_periodo').val('');
    $('#monto').val('');
  }

  btnAgregar() {
    this.estado = false;
    this.getCodigoService();
    this.cabecera = 'AGREGAR NUEVO SERVICIO';
    document.getElementById('openModalButton').click();
  }

  getCodigoService() {
    this.userServ.getCodigoServicio().subscribe((codigo) => {
      const cod = parseInt(codigo[0].total) + 1;
      const numeros = ('0000' + cod).substr(-6, 6);
      this.codigo = 'SERV' + numeros;
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
    await this.userServ.getServicioId({ id }).subscribe((data => {
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
      confirmButtonText: 'Sí, bórralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          allowOutsideClick: false,
          type: 'info',
          text: 'Espere por favor...'
        });
        Swal.showLoading();
        this.userServ.ServicioDelete({ id }).subscribe((data => {
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

  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement); // converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Listado de Servicios.xlsx');
  }

  exportarPdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#tabla_usuarios' });
    doc.save('table.pdf');
  }

  soloLetras(e) {
    const key = e.keyCode || e.which;
    const tecla = String.fromCharCode(key).toLowerCase();
    const letras = ' áéíóúabcdefghijklmnñopqrstuvwxyz';
    const especiales: any = '8-37-39-46';
    let tecla_especial = false;
    for (const i in especiales) {
      if (key === especiales[i]) {
        tecla_especial = true;
        break;
      }
    }
    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
      return false;
    }
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }
}


