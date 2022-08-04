import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpService) {
  }

  public async quitarProducto(idProducto: number) {
    return await this.http.post("/carrito/eliminar", {
      id: idProducto,
    });
  }

  public async agregarAlCarrito(idProducto: number, cantidad: number) {
    return await this.http.post("/carrito/agregar", {
      id: idProducto, cantidad: cantidad
    });
  }

  public async existeEnCarrito(idProducto: number) {
    return await this.http.post("/carrito/existe", {
      id: idProducto,
    });
  }

  async obtenerProductos() {
    return await this.http.get("/carrito");
  }
 
  async terminarCompra(datosCliente: any) {
    return await this.http.post("/compra", datosCliente);
  }
}

