import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
})
export class ResultadoComponent {
  //Aqui obtengo los resultados de la busqueda, la respuesta que devuelve la peticion http
  get resultadoapi() {
    return this.gifsService.apirespuesta;
  }

  constructor(private gifsService: GifsService) {}
}
