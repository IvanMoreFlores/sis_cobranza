import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { CrearCService } from '../../../services/crear_c/crear-c.service';
import { ServicioService } from '../../../services/servicio/servicio.service';
import * as moment from 'moment';
declare var $: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  pdfObj = null;
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
  detalles: any;

  constructor(private userServ: ClienteService,
    private servServ: ServicioService,
    private crearC: CrearCService) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.crearC.getConvenio().subscribe((data => {
      this.convenios = data;
      this.data = data;
      Swal.close();
    }));
  }

  getConvenio() {
    this.crearC.getConvenio().subscribe((data => {
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
        $('id_socio').val('');
        $('buscarSocioId').val('');
        $('#nombres').val('');
        $('#puesto').val('');
        $('#documento').val('');
      }
    });

    $('#buscarServicioId').keydown(function (e) {
      if (e.keyCode == 8) {
        $('id_servicio').val('');
        $('buscarServicioId').val('');
        $('#nombre').val('');
        $('#periodo').val('');
        $('#monto').val('');
      }
    });
  }

  btnAgregar() {
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
            $('#nombres').val(ui.item.nombre);
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
      console.log(arr[i].codigo);
      if (arr[i].codigo.match(regex)) {
        // tslint:disable-next-line: max-line-length
        matches.push({ value: arr[i].codigo, label: arr[i].codigo, id_usuario: arr[i].id_usuario, puesto: arr[i].puesto, nombre: arr[i].nombre, numero_doc: arr[i].numero_doc });
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
            $('#nombre').val(ui.item.nombre);
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
      console.log(arr[i].codigo);
      if (arr[i].codigo.match(regex)) {
        // tslint:disable-next-line: max-line-length
        matches.push({ value: arr[i].codigo, label: arr[i].codigo, id_servicio: arr[i].id_servicio, periodo: arr[i].periodo, nombre: arr[i].nombre, monto: arr[i].monto, dias: arr[i].dias });
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
      const TuFecha = new Date();
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
  }

  bordes() {
    setTimeout(function () {
      $('.border').css('border', '');
    }, 2000);
  }

  limpiar() {
    // $('#tabla_detalle tbody').empty();
    $('#id_socio').val('');
    $('#buscarSocioId').val('');
    $('#nombres').val('');
    $('#documento').val('');
    $('#puesto').val('');
    $('#id_servicio').val('');
    $('#id_dias').val('');
    $('#buscarServicioId').val('');
    $('#nombre').val('');
    $('#monto').val('');
    $('#periodo').val('');
    $('#codigo_covenio').val('');
    $('#fecha_covenio').val('');
    $('#id_periodo').val('');

  }

  btnEditar(id) {
    $('#tabla_detalle').dataTable().fnDestroy();
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.limpiar();
    this.estado = true;
    this.cabecera = 'PAGO DEL CONVENIO #' + id;
    $('#ModalConvenio').modal('show');
    this.crearC.getConvenioId({ id }).subscribe((data => {
      console.log(data);
      const user = data[0];
      this.detalle = data[0];
      $('#id_convenio').val(user.id_convenio);
      $('#id_socio').val(user.id_socio);
      $('#buscarSocioId').val(user.codigo_socio);
      $('#nombres').val(user.socio);
      $('#documento').val(user.num_socio);
      $('#puesto').val(user.puesto);
      $('#id_servicio').val(user.id_servicio);
      $('#id_dias').val(user.dias);
      $('#buscarServicioId').val(user.codigo_serv);
      $('#nombre').val(user.servicio);
      $('#monto').val(user.monto);
      $('#periodo').val(user.periodo);
      $('#codigo_covenio').val(user.codigo);
      $('#fecha_covenio').val(user.fecha);
      $('#id_periodo').val(user.id_periodo);
      this.crearC.getConveniodetalleId({ id }).subscribe((dato => {
        Swal.close();
        this.detalles = dato;
        console.log(this.detalles);
      }));
    }));
  }


  getImprimir(id) {
    const dataString = 'id=' + id;
    this.crearC.getImprimir(dataString).subscribe((dato => {
      const data = dato[0];
      console.log(data);
      const docDefinition = {
        pageSize: {
          width: 500,
          height: 350
        },
        content: [
          {
            style: 'tableExample',
            table: {
              widths: ['auto', 'auto'],
              body: [
                ['CODIGO DE CONVENIO', data.c_convenio],
                ['FECHA DE PAGO', data.fecha_pago],
                ['NOMBRES DE SOCIO', data.socio],
                ['CODIGO DE SOCIO', data.c_socio],
                ['NOMBRES DE SERVICIO', data.servicio],
                ['CODIGO DE SERVICIO', data.codigo_serv],
                ['MONTO PAGADO', 's./ ' + data.monto],
                ['N° DE CUOTA', data.n_cuota],
              ]
            },
          },
          {
            text: [
              { text: '\n\n', alignment: 'center' },
              { text: '____________________________\n', alignment: 'center' },
              { text: 'Firma y sello ', alignment: 'center' }
            ]
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [10, 10, 10, 10]
          }
        },
        defaultStyle: {
          alignment: 'justify'
        }
      };
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.pdfObj.download();
    }));
  }

  actualizar(id) {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    const cuota = [];
    const cuotas = [];
    const dataString = 'id=' + id;
    let ultima_cuota = [];
    this.crearC.getCuotaPagadas(dataString).subscribe((data => {
      console.log(data);
      $('[name="cuota[]"]:checked').each(function () {
        cuota.push($(this).val());
        cuotas.push($(this).val());
      });
      // ultima_cuota = cuotas.pop();
      console.log('Cuotas', cuotas);
      console.log('Total de cuotas', cuotas.length);
      cuotas.length > 1 ? ultima_cuota = cuotas.pop() : ultima_cuota = cuotas[0];
      console.log('ultima_cuota', ultima_cuota);
      console.log('data[0].id_detalle', data[0].id_detalle);
      console.log(data[0].id_detalle === ultima_cuota[0]);
      if (data[0].id_detalle === ultima_cuota) {
        const id = $('#id_convenio').val();
        const id_usuario = $('#id_socio').val();
        const dataString = 'id=' + id
          + '&cuota=' + cuota
          + '&id_usuario=' + id_usuario;
        console.log(cuota.length);
        if (cuota.length === 0) {
          Swal.close();
          $('#ModalConvenio').modal('hide');
        } else {
          this.crearC.PagarConvenioId(dataString).subscribe((data) => {
            Swal.close();
            console.log(data);
            if (data === true) {
              this.getConvenio();
              $('#ModalConvenio').modal('hide');
              Swal.fire(
                'Pagado',
                'Se registro correctamente el pago de servicio',
                'success'
              );
              console.log('true');
            } else {
              Swal.fire({
                type: 'warning',
                title: 'Error',
                text: 'Hubo un problema al registrarlo el pago de servicio',
              });
              console.log('false');
            }
          });
        }
      } else {
        Swal.close();
        Swal.fire({
          type: 'warning',
          title: 'Error',
          text: 'Seleccione una cuota valida',
        });
        console.log('Todo mal: ');
        console.log(data[0].id_detalle);
        console.log(ultima_cuota[0]);
        console.log(cuotas);
      }
    }));
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
    XLSX.writeFile(wb, 'Listado de convenios en proceso.xlsx');
  }

  exportarPdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#tabla_usuarios' });
    doc.save('table.pdf');
  }

  enviarNoti(convenio) {
    const option = { year: 'numeric', month: '2-digit', day: '2-digit' };
    console.log(convenio);
    console.log(convenio.fecha);
    console.log((new Date().toLocaleDateString('ja-JP', option)).split('/').join('-'));
    const id = convenio.id_convenio;
    const fecha1 = moment(convenio.fecha);
    const fecha2 = moment((new Date().toLocaleDateString('ja-JP', option)).split('/').join('-'));
    const dias = fecha1.diff(fecha2, 'days');
    if (dias === 5 || dias === -5) {
      console.log(fecha1.diff(fecha2, 'days'), ' dias de diferencia');
      $('#correo').val('');
      $('#fecha_pago').val(convenio.fecha);
      $('#monto_pago').val(convenio.monto);
      // alert(id);
      $('#deuda').modal('show');
      this.crearC.getConvenioId({ id }).subscribe((data => {
        console.log(data);
        const user = data[0];
        $('#correo').val(user.correo);
      }));
    } else {
      Swal.fire(
        'Notificación',
        'Es muy pronto para notifcar',
        'warning');
    }
  }

  enviarCorreo() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    const dataString = 'correo=' + $('#correo').val()
      + '&fecha_pago=' + $('#fecha_pago').val()
      + '&monto_pago=' + $('#monto_pago').val();
    this.crearC.sendEmail(dataString).subscribe((data) => {
      $('#deuda').modal('hide');
      Swal.close();
      Swal.fire(
        'Enviado',
        'Se notifico correctamente al socio sobre su deuda',
        'success');
    },
      (err: any) => {
        $('#deuda').modal('hide');
        Swal.close();
        Swal.fire(
          'No enviado',
          'No se pudo notificar correctamente al socio sobre su deuda',
          'warning');
      },
    );
  }


}
