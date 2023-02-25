import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  // el viewchild me sirve para usar una referencia en este caso la caja de busqueda
  // para luego de que se presione enter se vacie su contenido
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  /**Aqui voy a importar el servicio de busqueda lo coloco privado por que solo lo
   * voy a usar aqui */
  constructor(private gifService: GifsService) {}

  // hacemos una funcion para guardar en una constante lo que se recibe de la caja de texto
  buscar() {
    const busqueda = this.txtBuscar.nativeElement.value;

    //Vamos a evitar que se envie un valor vacio
    if (busqueda.trim().length === 0) {
      return;
    }

    this.gifService.buscarGifs(busqueda);

    // luego de que se busque se vacia la caja
    this.txtBuscar.nativeElement.value = '';
  }
}
