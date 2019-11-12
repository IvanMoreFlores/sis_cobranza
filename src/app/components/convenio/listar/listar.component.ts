import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { CrearCService } from '../../../services/crear_c/crear-c.service';
import { ServicioService } from '../../../services/servicio/servicio.service';
import Swal from 'sweetalert2';
declare var $: any;
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  userData: any[] = [];
  userList1: any;
  userList2: any;
  usuarios = [];
  servicios = [];
  convenios = [];
  data = [];
  lastkeydown1 = 0;
  lastkeydown2 = 0;
  subscription: any;
  cabecera: string;
  detalle: any;
  estado: any;

  constructor(private userServ: ClienteService,
    private servServ: ServicioService,
    private crearC: CrearCService) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.crearC.getConvenioSocioId({ id: localStorage.getItem('id') }).subscribe((data => {
      this.convenios = data;
      this.data = data;
      Swal.close();
    }));
  }

  getConvenio() {
    this.crearC.getConvenioSocioId({ id: localStorage.getItem('id') }).subscribe((data => {
      this.convenios = data;
      $('th').removeClass('sorting');
      $('th').removeClass('sorting_asc');
    }));
  }

  ngOnInit() {
    this.usuarios = [];
    this.userServ.getCliente().subscribe((data => {
      this.usuarios = data;
      Object.assign(this.userData, data);
    }));
    this.servicios = [];
    this.servServ.getServicio().subscribe((data => {
      this.servicios = data;
      Object.assign(this.servicios, data);
    }));

    $('#buscarSocioId').keydown(function (e) {
      if (e.keyCode == 8) {
        $('#id_socio').val('');
        $('#buscarSocioId').val('');
        $('#codigo').val('');
        $('#puesto').val('');
        $('#documento').val('');
      }
    });

    $('.datepicker').datepicker({
      dateFormat: 'yy-mm-dd',
    });

    $('#buscarServicioId').keydown(function (e) {
      if (e.keyCode == 8) {
        $('#id_servicio').val('');
        $('#buscarServicioId').val('');
        $('#servicio').val('');
        $('#periodo').val('');
        $('#monto').val('');
      }
    });
  }

  btnAgregar() {
    this.limpiar();
    this.estado = false;
    this.crearC.getCountConvenio().subscribe((codigo) => {
      console.log(codigo);
      console.log(parseInt(codigo[0].total + 1));
      console.log(parseInt(codigo[0].total));
      const cod = parseInt(codigo[0].total) + 1;
      const numeros = ('0000' + cod).substr(-6, 6);
      $('#codigo_covenio').val('CNVN' + (numeros));
      const f = new Date();
      this.cabecera = 'REGISTRAR NUEVO CONVENIO';
      $('#fecha_covenio').val(f.getFullYear() + '-' + (f.getMonth() + 1) + '-' + f.getDate());
      $('#ModalConvenio').modal('show');
    });
  }

  initializeItems() {
    this.convenios = this.data;
  }

  buscarPorSocio(ev) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.convenios = this.convenios.filter((convenio: any) => {
        return (convenio.socio.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarPorCodigo(ev) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.convenios = this.convenios.filter((convenio: any) => {
        return (convenio.codigo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarPorEstado(ev) {
    this.initializeItems();
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.convenios = this.convenios.filter((convenio: any) => {
        return (convenio.id_estado.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  buscarSocio($event) {
    const userId = (document.getElementById('buscarSocioId') as HTMLInputElement).value.toUpperCase();
    console.log(userId);
    this.userList2 = [];
    if (userId.length > 2) {
      console.log($event.timeStamp);
      console.log(this.lastkeydown2);
      if ($event.timeStamp - this.lastkeydown2 > 200) {
        this.userList2 = this.searchFromSocio(this.userData, userId);
        console.log(this.userList2);
        $('#buscarSocioId').autocomplete({
          minLength: 2,
          source: this.userList2,
          select(event, ui) {
            console.log(ui);
            $('#codigo').val(ui.item.codigo);
            $('#puesto').val(ui.item.puesto);
            $('#id_socio').val(ui.item.id_usuario);
            $('#documento').val(ui.item.numero_doc);
            // document.getElementById('nombres').innerText = ui.item.nombre;
          },
          messages: {
            noResults: 'Sin resultados que mostrar',
            results() { }
          }
        });
      }
    }
  }


  searchFromSocio(arr, regex) {
    console.log(arr);
    console.log(regex);
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      console.log(arr[i].nombre);
      if (arr[i].nombre.match(regex)) {
        // tslint:disable-next-line: max-line-length
        matches.push({ value: arr[i].nombre, label: arr[i].nombre, id_usuario: arr[i].id_usuario, puesto: arr[i].puesto, codigo: arr[i].codigo, numero_doc: arr[i].numero_doc });
        console.log(matches);
      }
    }
    return matches;
  }

  buscarServicio($event) {
    const userId = (document.getElementById('buscarServicioId') as HTMLInputElement).value.toUpperCase();
    console.log(userId);
    this.userList2 = [];
    if (userId.length > 2) {
      console.log($event.timeStamp);
      console.log(this.lastkeydown2);
      if ($event.timeStamp - this.lastkeydown2 > 200) {
        this.userList2 = this.searchFromServicio(this.servicios, userId);
        console.log(this.userList2);
        $('#buscarServicioId').autocomplete({
          minLength: 2,
          source: this.userList2,
          select(event, ui) {
            console.log(ui);
            $('#servicio').val(ui.item.codigo);
            $('#periodo').val(ui.item.periodo);
            $('#id_servicio').val(ui.item.id_servicio);
            $('#monto').val(ui.item.monto);
            $('#id_dias').val(ui.item.dias);
            // document.getElementById('nombres').innerText = ui.item.nombre;
          },
          messages: {
            noResults: 'Sin resultados que mostrar',
            results() { }
          }
        });
      }
    }
  }

  searchFromServicio(arr, regex) {
    console.log(arr);
    console.log(regex);
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      console.log(arr[i].nombre);
      if (arr[i].nombre.match(regex)) {
        // tslint:disable-next-line: max-line-length
        matches.push({ value: arr[i].nombre, label: arr[i].nombre, id_servicio: arr[i].id_servicio, periodo: arr[i].periodo, codigo: arr[i].codigo, monto: arr[i].monto, dias: arr[i].dias });
        console.log(matches);
      }
    }
    return matches;
  }

  traer_detalle() {
    $('#tabla_detalle tbody').empty();
    console.log($('#id_periodo').val());
    if ($('#monto').val() === null || $('#monto').val() === '') {
      console.log('Monto vacio');
    } else {
      console.log('Monto no vacio');
      console.log($('#monto').val());
      const fechas = [];
      const TuFecha = new Date($('#fecha_covenio').val());
      const dias = parseFloat($('#id_dias').val());
      let cuotas: number;
      if (dias === 7) {
        cuotas = parseFloat($('#id_periodo').val()) * 4;
      }
      if (dias === 14) {
        cuotas = parseFloat($('#id_periodo').val()) * 2;
      }
      if (dias === 30) {
        cuotas = parseFloat($('#id_periodo').val()) * 1;
      }
      // const cuotas = parseFloat($('#id_periodo').val());
      let i;
      for (i = 0; i < cuotas; i++) {
        // this.detalle.push({monto:$('#monto').val(),fecha:});009
        const nFilas = $('#tabla_detalle tr').length;
        // nueva fecha sumada
        TuFecha.setDate(TuFecha.getDate() + dias);
        console.log(TuFecha.getFullYear() + '-' + (TuFecha.getMonth() + 1) + '-' + TuFecha.getDate());
        $('#tabla_detalle > tbody').append('<tr><td>' + nFilas +
          '</td><td>' + TuFecha.getFullYear() + '-' + (TuFecha.getMonth() + 1) + '-' + TuFecha.getDate() +
          '</td><td>' + $('#monto').val() + '</td></tr>');
      }
    }

  }

  agregarConvenio() {
    const codigo = $.trim($('#codigo_covenio').val());
    let id_socio = $.trim($('#id_socio').val());
    let id_servicio = $.trim($('#id_servicio').val());
    let id_periodo = $.trim($('#id_periodo').val());
    let fecha_covenio = $.trim($('#fecha_covenio').val());

    if (id_socio === '' || id_socio === null) {
      $('#buscarSocioId').css('border', '1px solid red');
      $('#buscarSocioId').focus();
      this.bordes();
      return false;
    }
    if (id_servicio === '' || id_servicio === null) {
      $('#buscarServicioId').css('border', '1px solid red');
      $('#buscarServicioId').focus();
      this.bordes();
      return false;
    }
    if (id_periodo === '' || id_periodo === null) {
      $('#id_periodo').css('border', '1px solid red');
      $('#id_periodo').focus();
      this.bordes();
      return false;
    }
    if (fecha_covenio === '' || fecha_covenio === null) {
      $('#fecha_covenio').css('border', '1px solid red');
      $('#fecha_covenio').focus();
      this.bordes();
      return false;
    } else {
      let detalle = '[';
      // (document.getElementById('buscarServicioId') as HTMLInputElement)
      for (let i = 1; i < (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows.length; i++) {
        detalle = detalle
          + '{"n_cuota":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[0].innerHTML + '",'
          + '"fecha_cuota":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[1].innerHTML + '",'
          + '"monto":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[2].innerHTML + '"'
          + '}';
        if (i === (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows.length - 1) {
          detalle = detalle + ']';
        } else {
          detalle = detalle + ',';
        }
      }

      const dataString = 'id_socio=' + id_socio
        + '&codigo=' + codigo
        + '&id_servicio=' + id_servicio
        + '&id_periodo=' + id_periodo
        + '&id_usuario=' + localStorage.getItem('id')
        + '&fecha_covenio=' + fecha_covenio
        + '&detalle=' + detalle;
      console.log(dataString);
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.crearC.getValidar(dataString).subscribe((datos) => {
        console.log(datos.length);
        if (datos.length > 0) {
          Swal.close();
          Swal.fire({
            type: 'warning',
            title: 'Error',
            text: 'El cliente ya tiene un convenio activo',
          });
        } else {
          this.crearC.createConvenio(dataString).subscribe((data) => {
            Swal.close();
            console.log(data);
            if (data === true) {
              this.getConvenio();
              $('#ModalConvenio').modal('hide');
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
      });
    }
  }

  bordes() {
    setTimeout(function () {
      $('.border').css('border', '');
    }, 2000);
  }

  limpiar() {
    $('#tabla_detalle tbody').empty();
    $('#id_socio').val('');
    $('#buscarSocioId').val('');
    $('#codigo').val('');
    $('#documento').val('');
    $('#puesto').val('');
    $('#id_servicio').val('');
    $('#id_dias').val('');
    $('#buscarServicioId').val('');
    $('#servicio').val('');
    $('#monto').val('');
    $('#periodo').val('');
    $('#codigo_covenio').val('');
    $('#fecha_covenio').val('');
    $('#id_periodo').val('');

  }

  btnEditar(id) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.limpiar();
    this.estado = true;
    this.cabecera = 'EDITAR CONVENIO #' + id;
    $('#ModalConvenio').modal('show');
    this.crearC.getConvenioId({ id }).subscribe((data => {
      console.log(data);
      const user = data[0];
      $('#id_convenio').val(user.id_convenio);
      $('#id_socio').val(user.id_socio);
      $('#buscarSocioId').val(user.socio);
      $('#codigo').val(user.codigo_socio);
      $('#documento').val(user.num_socio);
      $('#puesto').val(user.puesto);
      $('#id_servicio').val(user.id_servicio);
      $('#id_dias').val(user.dias);
      $('#buscarServicioId').val(user.servicio);
      $('#servicio').val(user.codigo_serv);
      $('#monto').val(user.monto);
      $('#periodo').val(user.periodo);
      $('#codigo_covenio').val(user.codigo);
      $('#fecha_covenio').val(user.fecha);
      $('#id_periodo').val(user.id_periodo);
      this.crearC.getConveniodetalleId({ id }).subscribe((data => {
        Swal.close();
        let i;
        for (i = 0; i < data.length; i++) {
          const nFilas = $('#tabla_detalle tr').length;
          $('#tabla_detalle > tbody').append('<tr><td>' + nFilas +
            '</td><td>' + data[i].fecha +
            '</td><td>' + data[i].monto + '</td></tr>');
        }
      }));
    }));
  }

  actualizar() {
    const codigo = $.trim($('#codigo_covenio').val());
    let id_socio = $.trim($('#id_socio').val());
    let id_servicio = $.trim($('#id_servicio').val());
    let id_periodo = $.trim($('#id_periodo').val());
    let fecha_covenio = $.trim($('#fecha_covenio').val());
    let id_convenio = $.trim($('#id_convenio').val());

    if (id_socio === '' || id_socio === null) {
      $('#buscarSocioId').css('border', '1px solid red');
      $('#buscarSocioId').focus();
      this.bordes();
      return false;
    }
    if (id_servicio === '' || id_servicio === null) {
      $('#buscarServicioId').css('border', '1px solid red');
      $('#buscarServicioId').focus();
      this.bordes();
      return false;
    }
    if (id_periodo === '' || id_periodo === null) {
      $('#id_periodo').css('border', '1px solid red');
      $('#id_periodo').focus();
      this.bordes();
      return false;
    }
    if (fecha_covenio === '' || fecha_covenio === null) {
      $('#fecha_covenio').css('border', '1px solid red');
      $('#fecha_covenio').focus();
      this.bordes();
      return false;
    } else {
      let detalle = '[';
      // (document.getElementById('buscarServicioId') as HTMLInputElement)
      for (let i = 1; i < (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows.length; i++) {
        detalle = detalle
          + '{"n_cuota":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[0].innerHTML + '",'
          + '"fecha_cuota":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[1].innerHTML + '",'
          + '"monto":"'
          + (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows[i].cells[2].innerHTML + '"'
          + '}';
        if (i === (document.getElementById('tabla_detalle') as HTMLTableSectionElement).rows.length - 1) {
          detalle = detalle + ']';
        } else {
          detalle = detalle + ',';
        }
      }

      const dataString = 'id_socio=' + id_socio
        + '&codigo=' + codigo
        + '&id_servicio=' + id_servicio
        + '&id_periodo=' + id_periodo
        + '&id_usuario=' + localStorage.getItem('id')
        + '&fecha_covenio=' + fecha_covenio
        + '&detalle=' + detalle
        + '&id_convenio=' + id_convenio;
      console.log(dataString);
      Swal.fire({
        allowOutsideClick: false,
        type: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();
      this.crearC.UpdateConvenioId(dataString).subscribe((data) => {
        Swal.close();
        console.log(data);
        if (data === true) {
          this.getConvenio();
          $('#ModalConvenio').modal('hide');
          Swal.fire(
            'Actualizado',
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
        this.crearC.DeleteConvenioId({ id }).subscribe((data => {
          Swal.close();
          if (data === true) {
            this.getConvenio();
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

  btnHistorial(id) {
    const dataString = 'id=' + id;
    this.crearC.getHistorial(dataString).subscribe((data => {
      $('#timeline').html(data);
      $('#modal_form_usuario').modal('show');
      $('#cabecera').html('HISTORIAL DEL REQUERIMIENTO #' + id);
      $('#historial').modal('show');
    }));
  }

  exportarExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement); // converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Listado de convenios creados.xlsx');
  }

  exportarPdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#tabla_usuarios' });
    doc.save('table.pdf');
  }

}
