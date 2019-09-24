import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { ServicioService } from '../../../services/servicio/servicio.service';
declare var $: any;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  userData: any[] = [];
  userList1: any;
  userList2: any;
  usuarios = [];
  servicios = [];
  data = [];
  lastkeydown1 = 0;
  lastkeydown2 = 0;
  subscription: any;
  cabecera: string;
  detalle: any;
  estado: any;

  constructor(private userServ: ClienteService,
              private servServ: ServicioService) { }

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

    $('#buscarSocioId').keydown(function(e) {
      if (e.keyCode == 8) {
        $('id_socio').val('');
        $('buscarSocioId').val('');
        $('#nombres').val('');
        $('#puesto').val('');
        $('#documento').val('');
      }
    });

    $('#buscarServicioId').keydown(function(e) {
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
    const f = new Date();
    // document.write(f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear());
    this.cabecera = 'REGISTRAR NUEVO CONVENIO';
    $('#fecha_covenio').val(f.getDate() + '-' + (f.getMonth() + 1) + '-' + f.getFullYear());
    $('#ModalConvenio').modal('show');
  }

  buscarPorSocio(ev) { }

  buscarPorCodigo(ev) { }

  buscarPorEstado(ev) { }

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
    let id_socio = $.trim($('#id_socio').val());
    let id_servicio = $.trim($('#id_servicio').val());
    let id_periodo = $.trim($('#id_periodo').val());
    let fecha_covenio = $.trim($('#fecha_covenio').val());

    if (id_socio === '' || id_socio === null) {
      $('#id_socio').css('border', '1px solid red');
      $('#id_socio').focus();
      this.bordes();
      return false;
    }

  }

  bordes() {
    setTimeout(function() {
      $('.border').css('border', '');
    }, 2000);
  }

  actualizar() {

  }


}
