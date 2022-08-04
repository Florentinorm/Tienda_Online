import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePwd = true;
  hideConfirmPwd = true;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    ) {}

ngOnInit(): void {
}

loginForm = this.fb.group({
  email : ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
  password : ['', [Validators.required, Validators.minLength(7), Validators.maxLength(100) ]]
});


 onLogin() {
  // Se verifica que el formulario sea correcto
  if (this.loginForm.invalid) return;  
  // obtener los datos del formulario
  const formValue = this.loginForm.value;
  this.authService.login(formValue)
  .subscribe( (user) => {
      //verifica si existe un error con el proceso del loguin
      if (!user) {
        Swal.fire({
          title: 'usuario y/o contraseña incorrectos',
          text: 'Por favor verifique los datos ingresados'
        });
      }
  });
}

  getErrorMessage(field: string) {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo requerido';
      } else if (form.hasError('maxlength')){
        message = 'Excede el máximo de caracteres';
      } else if (form.hasError('email')){
        message = 'Email incorrecto';
      }
    }
    return message;
  }

  isValidField(field: string) {
    var form = this.loginForm.get(field);
    var flag = false;
    if (form != null) {
      flag = form.touched || form.dirty && !form.valid
    }

    return flag;
  }

}
