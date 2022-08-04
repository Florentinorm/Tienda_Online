import {Component, OnInit} from '@angular/core';
import {CarritoService} from "../../../carrito.service";
import {DataSharingService} from "../../../data-sharing.service";
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from "../../../cliente";
import { AuthService } from '../../Login-Register/services/auth.service';

export interface PeriodicElement {
  producto: string;
  descripcion: string;
  categoria: string;
  precio: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {producto: "Laptop Hp", descripcion: 'Este es una laptop', categoria: "Tecnologia", precio: 25000},
  {producto: "Mouse", descripcion: 'HP', categoria: "Tecnologia", precio: 1000},
];

@Component({
  selector: 'app-terminar-compra',
  templateUrl: './terminar-compra.component.html',
  styleUrls: ['./terminar-compra.component.css']
})
export class TerminarCompraComponent implements OnInit {

  constructor(private carritoService: CarritoService, private dataSharingService: DataSharingService, private authSvc: AuthService) {
  }

  public compraTerminada = false;
  public productos = [];
  public columnas = ['nombre', 'descripcion', 'precio', 'quitar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public clienteModel = new Cliente("", "");

  public async revisarYTerminar(stepper) {
    if (!this.clienteModel.direccion) {
      return alert("Falta escribir la dirección del cliente");
    }
    if (!this.clienteModel.nombre) {
      return alert("Falta escribir el nombre del cliente");
    }

    let id = this.authSvc.idUsuario.getValue()
    console.log(id)
    const datos = {
      cliente: this.clienteModel,
      idUsuario: id
    }
    const respuestaCompra = await this.carritoService.terminarCompra(datos);
    console.log({respuestaCompra})


    this.compraTerminada=true;
    stepper.next();
    this.dataSharingService.changeMessage("car_updated")
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public total() {
    let total = 0;
    this.productos.forEach(p => total += p.precio);
    return total;
  }

  public async quitar(producto) {
    await this.carritoService.quitarProducto(producto.id);
    await this.obtenerProductos();
    // Comunicación entre componentes
    this.dataSharingService.changeMessage("car_updated");
  }

  public async obtenerProductos() {

    this.productos = await this.carritoService.obtenerProductos();
  }

  public irAPaso2() {

  }

  async ngOnInit() {
    await this.obtenerProductos();
  }

}
