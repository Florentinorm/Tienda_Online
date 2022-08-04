import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
//import { NgxSpinnerService } from "ngx-spinner";
import { ForgotPasswordService } from '../services/forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  signupForm!: FormGroup; //hace referencia a nuestro fomulario de registro del html
  public email: string | undefined;
  constructor(private router: Router, private ForgotSvc: ForgotPasswordService) { }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup(); //llamaremos la funcion createFormGroup para que se inicialice
  }

    //método para las validaciones de los campos provenientes del formulario
  createFormGroup(): FormGroup {
    //retornaremos un FormGroup con las validaciones correspondientes
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]),
    });
  }

  submit(): void {
    if (this.signupForm.invalid) return; 

    const formValue = this.signupForm.value;
    console.log(formValue)
    this.ForgotSvc.forgotPassword(formValue).subscribe((result:any) => {
      //this.spinner.show();
      if(result) {
        Swal.fire({
          title: 'Verifica tu identidad',
          text: 'Te enviamos un correo electrónico para continuar con el proceso de recuperación de contraseña!'
        });
      }

  })
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
    } else if (form.hasError('pattern')){
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
