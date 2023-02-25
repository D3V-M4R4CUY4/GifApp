import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-barralateral',
  templateUrl: './barralateral.component.html',
})
export class BarralateralComponent {
  // //Importo el servicio para acceder a los metodos
  constructor(private gifService: GifsService) {}

  //Aqui obtengo el historial
  get obtenerhistorial() {
    return this.gifService.historial;
  }

  buscar(item: string) {
    this.gifService.buscarGifs(item);
  }
}
