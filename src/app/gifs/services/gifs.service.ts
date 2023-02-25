import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, Respuesta } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  //Api Key de giphy
  private apiKey: string = 'tZCErd9KcRfkvMD63rFIUm2uQbl4StUx';

  /**Url endpoint */
  private endpoint: string = 'https://api.giphy.com/v1/gifs';

  /**Aqui creare un arreglo donde voy a ir almacenando lo que se haya buscado */
  private _historial: string[] = [];

  /**Aqui almaceno lo que me devuelva la peticion hecha a la api */
  public apirespuesta: Gif[] = [];

  //Este get es el que me va devolver lo que contenga el arreglo
  get historial() {
    return [...this._historial];
  }

  //Inyecto el servicio http
  constructor(private http: HttpClient) {
    /**Aqui es donde vamos a indicar que despues de que se recargue la pagina se muestre el historial pero PERO, el que almacenamos
     * en el local storage, de lo contrario si no se almacena nada no importa va devolver un arreglo vacio*/
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    //**Aqui muestro las imagenes de la ultima busqueda, que van a persistir despues de recargar la pagina */
    this.apirespuesta = JSON.parse(localStorage.getItem('respuesta')!) || [];
  }

  //Esta sera la funcion de busqueda del gif
  buscarGifs(querygif: string) {
    /**Aqui defino que todo lo voy a guardar en minusculas para que si ejemplo
     * escribo Goku y luego goku no es el mismo valor se almacena y por ahi se puede
     * seguir teniendo duplicados  */
    querygif = querygif.trim().toLocaleLowerCase();

    /**Realizo la comprobacion de que si algo no hace parte del arreglo
     * osea un ejemplo si tengo a goku y luego a yasuo se me cumple que no esta en el
     * arreglo entonces me inserta el valor, si existe no hace nada asi evito los
     * duplicados */
    if (!this._historial.includes(querygif)) {
      //Esta instruccion es la que me va ingresar los valores al arreglo
      this._historial.unshift(querygif);
      //Aqui voy a limitar a 10 la canitdad de registros en el historial
      this._historial = this._historial.splice(0, 10);

      /**De est manera voy hacer que el historial sea persistente, almacenandolo en el local storage
       * con el json stringify lo que hago es convertir todo a una cadena, ya que el setitem solo permite cadenas */
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //**Aqui voy a definir los parametros de la url que se usan para enviar la peticion http para que sea mas claro */
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', querygif);

    /**Aqui se esta haciendo el llamado a la api pasandole lo que escribimos en la caja
     * que aqui seria el querygif que es quien trae esa data*/
    this.http
      .get<Respuesta>(`${this.endpoint}/search`, { params })
      .subscribe((respuesta) => {
        //Aqui indico donde se guarda la respuesta
        this.apirespuesta = respuesta.data;
        //**Aqui se guarda en el local storage las imagenes de la ultima busqueda */
        localStorage.setItem('respuesta', JSON.stringify(this.apirespuesta));
      });
  }
}
