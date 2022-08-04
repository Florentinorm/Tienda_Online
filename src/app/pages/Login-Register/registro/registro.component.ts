import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  signupForm!: FormGroup; //hace referencia a nuestro fomulario de registro del html
  hidePwd = true;
  hideConfirmPwd = true;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup(); //llamaremos la funcion createFormGroup para que se inicialice
  }

  //método para las validaciones de los campos provenientes del formulario
  createFormGroup(): FormGroup {
    //retornaremos un FormGroup con las validaciones correspondientes
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20),  this.noWhitespaceValidator ]),
      apellidopaterno: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.noWhitespaceValidator ]),
      apellidomaterno: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(20), this.noWhitespaceValidator  ]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50), this.noWhitespaceValidator]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(100),
        this.noWhitespaceValidator
      ])
    });
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  //funcion que realizará el signup, una ves capturado el evento ngSubmit en el html
  signup(): void { //será de tipo void (vacio)
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      //console.log(msg); //mandar mensaje al usuario de ingreso
      Swal.fire({
        title: 'Usuario Registrado',
        text: 'El usuario ha sido registrado con éxito!'
      });
      this.router.navigate(["login"]);
    });
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
