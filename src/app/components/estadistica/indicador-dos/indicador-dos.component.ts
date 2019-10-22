import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IndicadorService } from '../../../services/indicador/indicador.service';
import { Chart } from 'chart.js';
declare var $: any;

@Component({
  selector: 'app-indicador-dos',
  templateUrl: './indicador-dos.component.html',
  styleUrls: ['./indicador-dos.component.scss']
})
export class IndicadorDosComponent implements OnInit {
  @ViewChild("barCanvas", { static: false }) barCanvas: ElementRef;
  barChart: Chart;
  myChart: any;
  convenios: any;
  n_convenio: number = 0;
  monto: number = 0;
  monto_deuda: number = 0;
  indicador: any = 0;
  div_porcentaje: boolean = false;
  // div_tabla: boolean = true;
  // div_grafica: boolean = false;
  n_convenio_g: any = [];
  monto_g: any = [];
  monto_deuda_g: any = [];
  fecha_g: any = [];
  barchart: any;
  constructor(public indServ: IndicadorService,
    public elementRef: ElementRef) { }

  ngOnInit() {

    $('#div_tabla').show();
    $('#div_grafica').hide();
    $('.datepicker').datepicker({
      dateFormat: 'dd/mm/yy',
      regional: "es"
    });
  }

  btn_buscar() {
    this.n_convenio_g = [];
    this.fecha_g = [];
    // this.n_convenio = 0;
    // this.monto = 0;
    // this.monto_deuda = 0;
    // this.indicador = 0;
    // $('#contenedor_grafico').append("<canvas #barCanvas id='barCanvas'></canvas>");
    $('#div_tabla').show();
    $('#div_grafica').hide();
    console.log($('#f_inicio').val());
    console.log($('#f_fin').val());
    if ($('#f_inicio').val() === '' || $('#f_fin').val() === '') {
      alert('Coloque la fecha a buscar');
    } else {
      this.indServ.getIndicador_dos({ f_inicio: $('#f_inicio').val(), f_fin: $('#f_fin').val() }).subscribe((data => {
        console.log(data.length);
        if (data.length > 0) {
          this.convenios = data;
          this.div_porcentaje = true;
          console.log(data[0]);
          data.forEach(element => {
            this.n_convenio_g.push(element.n_convenio);
            this.fecha_g.push(element.fecha);
            this.n_convenio = + parseInt(element.n_convenio);
            this.monto = + parseInt(element.monto);
            this.monto_deuda = + parseInt(element.monto_deuda);
          });
          console.log(this.n_convenio_g);
          console.log(this.fecha_g);
          this.indicador = ((this.monto_deuda * 30) / this.monto).toFixed(2);
        } else {
          alert('No se encontro datos para mostrar');
        }
      }));
    }
  }

  btn_grafico() {
    if (this.barchart !== undefined) {
      this.barchart.destroy();
    }
    $('#div_tabla').hide();
    $('#div_grafica').show();
    this.barchart = new Chart(this.barCanvas.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: this.fecha_g,
        datasets: [
          {
            label: '# Cantidad de cuentas por cobrar',
            data: this.n_convenio_g,
            borderColor: '#df382c',
            backgroundColor: '#df382c',
            fill: true
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.barCanvas.nativeElement); // throws an error
  }

}
