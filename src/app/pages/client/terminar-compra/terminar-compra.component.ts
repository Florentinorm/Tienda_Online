import {Component, OnInit} from '@angular/core';
import {CarritoService} from "../../../carrito.service";
import {DataSharingService} from "../../../data-sharing.service";
import {MatTableDataSource} from '@angular/material/table';
import {Cliente} from "../../../cliente";
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  signupForm!: FormGroup;
  search: any;
  search2: any;
  buscar: any;

  
  constructor(private carritoService: CarritoService, private dataSharingService: DataSharingService, private authSvc: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.signupForm = this.createFormGroup();
    await this.obtenerProductos();
  }
  
 
  
  createFormGroup(): FormGroup {
    return new FormGroup({
      nomPro: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.noWhitespaceValidator]),
      descripcion: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
        this.noWhitespaceValidator
      ]),
      precio: new FormControl("", [Validators.required, Validators.min(50), Validators.max(100000)]),
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public compraTerminada = false;
  public productos = [];
  public columnas = ['nombre', 'cantidad', 'precio', 'quitar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  public clienteModel = new Cliente("", "");

  public async revisarYTerminar(stepper) {
    if (!this.clienteModel.direccion) {
      return alert("Falta escribir la dirección del cliente");
    }

    let id = this.authSvc.idUsuario.getValue()
    const datos = {
      cliente: this.clienteModel,
      idUsuario: id
    }
    this.carritoService.terminarCompra(datos)

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
    this.productos.forEach(p => total += (p.precio * p.cantidad));
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

  getErrorMessage(field: string) {
    let message = '';
    var form = this.signupForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo requerido';
      } else if (form.hasError('minlength')) {
        message = 'El mínimo de caracteres son 3';
      } else if (form.hasError('maxlength')){
        message = 'Excede el máximo de caracteres';
      } else if (form.hasError('whitespace')){
        message = 'Solo se acepta caracteres sin espacio'
      }
    }
    return message;
  }

  isValidField(field: string) {
    var form = this.signupForm.get(field);
    var flag = false;
    if (form != null) {
      flag = form.touched || form.dirty && !form.valid
    }

    return flag;
  }

  noEspaciosAlPrincipio() {
    let stringArr = this.search.split(/(\s+)/);
    if (stringArr[0] === '') {
    this.search = '';

    for (let i = 2; i < stringArr.length; i++) {
     this.search += stringArr[i];
    }
  }
 }

 noEspaciosAlPrincipio2() {
  let stringArr = this.search2.split(/(\s+)/);
  if (stringArr[0] === '') {
  this.search2 = '';

  for (let i = 2; i < stringArr.length; i++) {
   this.search2 += stringArr[i];
  }
}
}
}