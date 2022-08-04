import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Producto} from "../../../producto";
import {ProductosService} from "../../../productos.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  productoModel = new Producto("", "",);
  @ViewChild("foto", {
    read: ElementRef
  }) foto: ElementRef;

  signupForm!: FormGroup;

  constructor(private productosService: ProductosService, private snackBar: MatSnackBar) {
  }

  public cargando = false;
  
  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    //retornaremos un FormGroup con las validaciones correspondientes
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
  
  async guardar() {
    this.productoModel.nombre = this.signupForm.value.nomPro;
    this.productoModel.descripcion = this.signupForm.value.descripcion;
    this.productoModel.precio = this.signupForm.value.precio;

    let archivos = this.foto.nativeElement.files;
    if (!archivos.length) {
      return alert("Selecciona al menos una foto");
    }
    this.cargando = true;
    // Guardamos producto
    const idProductoGuardado = await this.productosService.agregarProducto(this.productoModel);
    // Y luego las fotos
    const fd = new FormData();
    for (let x = 0; x < archivos.length; x++) {
      fd.append(`foto_${x}`, archivos[x])
    }
    fd.append("idProducto", idProductoGuardado);
    const respuesta = await this.productosService.agregarFotosDeProducto(fd);
    this.snackBar.open("Producto guardado", "", {
      duration: 1500,
      horizontalPosition: "start",
      verticalPosition: "top",
    });

    this.cargando = false;
    this.productoModel = new Producto("", "");
    this.signupForm = this.createFormGroup();
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
        message = 'El precio no puede ser menor a 50'
      }else if(form.hasError('max')){
        message = 'El precio no puede ser mayor a 100000'
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
