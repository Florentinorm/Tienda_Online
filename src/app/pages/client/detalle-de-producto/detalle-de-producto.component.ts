import {Component, OnInit} from '@angular/core';
import {ProductosService} from "../../../productos.service";
import {ActivatedRoute} from "@angular/router";
import {Producto} from "../../../producto";
import {CarritoService} from "../../../carrito.service";
import {DataSharingService} from "../../../data-sharing.service";
import {environment} from "../../../../environments/environment";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})
export class DetalleDeProductoComponent implements OnInit {
  public producto = {
    id: 0,
    fotos: [],
    nombre: "",
    descripcion: "",
    precio: "",
  };
  public fotoSeleccionada: string;
  public indiceSeleccionado = 0;
  public yaExiste: boolean;
  signupForm!: FormGroup;
  cantidad = 0;

  constructor(private carritoService: CarritoService, private productosService: ProductosService, private activatedRoute: ActivatedRoute, private dataSharingService: DataSharingService) {

  }

  public resolverFoto(foto) {
    const baseUrl = environment.baseUrl;
    return `${baseUrl}/foto_producto/${foto}`;
  }

  public seleccionarImagen(indice) {
    this.indiceSeleccionado = indice;
    this.fotoSeleccionada = this.producto.fotos[this.indiceSeleccionado].foto;
  }

  public async quitarDelCarrito() {
    const {id} = this.producto;
    const respuesta = await this.carritoService.quitarProducto(id);
    console.log({respuesta})
    this.signupForm = this.createFormGroup();
    this.refrescarEstado();
  }

  public async agregarAlCarrito() {
    this.cantidad = this.signupForm.value.cantidad;
    const {id} = this.producto;
    const respuesta = await this.carritoService.agregarAlCarrito(id, this.cantidad);
    console.log({respuesta})
    this.refrescarEstado();
  }

  async refrescarEstado() {
    const id = this.producto.id;
    this.yaExiste = await this.carritoService.existeEnCarrito(id);
    // Comunicación entre componentes
    this.dataSharingService.changeMessage("car_updated");
  }

  async ngOnInit() {
    this.signupForm = this.createFormGroup();
    const id = this.activatedRoute.snapshot.paramMap.get("id")
    this.producto = await this.productosService.obtenerProductoConFotosPorId(id);
    if (this.producto.fotos.length >= 0) {
      this.seleccionarImagen(0);
    }
    this.refrescarEstado();
  }
  
  createFormGroup(): FormGroup {
    //retornaremos un FormGroup con las validaciones correspondientes
    return new FormGroup({
      cantidad: new FormControl("", [Validators.required, Validators.min(1), Validators.max(10)]),
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
      } else if (form.hasError('email')){
        message = 'Email incorrecto';
      } else if (form.hasError('whitespace')){
        message = 'Solo se acepta caracteres sin espacio'
      } else if(form.hasError('min')){
        message = 'El minimo debe ser 1'
      }else if(form.hasError('max')){
        message = 'El maximo es 10'
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
}
