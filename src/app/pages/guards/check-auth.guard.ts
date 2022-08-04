import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import Swal from 'sweetalert2';

import { Observable } from "rxjs";
import { AuthService } from "../Login-Register/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserLoggedIn$.value === false) {
      console.log('entro cliente')
        Swal.fire({
            title: 'Acceso denegado',
            text: 'Tiene que acceder mediante un login'
          });
          this.router.navigate(["login"]);
          return false;
    } else {
      return true;
    }
  }
}
