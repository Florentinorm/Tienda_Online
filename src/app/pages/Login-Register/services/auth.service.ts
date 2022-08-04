import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { first, catchError, tap, map } from 'rxjs/operators';

import { User, UserResponse } from '../models/User';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UtilsService } from 'src/app/services/utils.service';

const helperSvc = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private url = "http://localhost:3000/auth"; //url del servidor

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  isUserAdmin$ = new BehaviorSubject<boolean>(false);
  private token = new BehaviorSubject<string>(''); //recibirá tipo string
  get token$(): Observable<string> {
    //devolverá un observavble de tipo string
    return this.token.asObservable(); //se quedará escuchando el token para verificar cuando hace cambios y se actualice automáticamente
  }

  idUsuario = new BehaviorSubject<string>(''); //recibirá tipo string
  get idUsuario$(): Observable<string> {
    //devolverá un observavble de tipo string
    return this.idUsuario.asObservable(); //se quedará escuchando el token para verificar cuando hace cambios y se actualice automáticamente
  }


  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
   // private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private utilsSvc: UtilsService
  ) {
    //se ejecutará el checktoken
   // this.checkToken();
  }

  //método que devolverá un observable y será de tipo User
  signup(user: Omit<User, 'id'>): Observable<User> {
    console.log(user)
    //retornaremos las solicitud http
    return (
      this.http
        //se pasa la url, después el objeto user que entra como argumento
        .post<User>(`${environment.API_URL}/signup`, user, this.httpOptions)
        .pipe(
          first(),
          catchError((error)=> this.handlerError(error)) //obtenemos el mensaje arrojado desde el servidor
        )
    );
  }

  /**
   * @descrription LOGIN
   * @param email
   * @param password
   * @returns
   */

  //se agrega el objeto user del archivo user.interface.ts
  login(userData: any) {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/login`, userData)
      .pipe(
        map((user: UserResponse) => {
          //si no ocurrio un errror. 0 indica que no hay errores
          if (user.code === 0) {
            //this.user.next(user.idUsuario);
            this.token.next(user.token); //le decimos que continue, le pasamos el token del user
            this.SaveLocalStorage(user.token); //método para guardar el token
            this.idUsuario.next(user.userId);
            if (user.idRol === 2) {
              this.isUserAdmin$.next(true);
              this.isUserLoggedIn$.next(true);
              this.router.navigate(['/productos']);
            } else if (user.idRol === 1) {
              this.isUserLoggedIn$.next(true);
              console.log(this.isUserLoggedIn$)
              this.router.navigate(['/tienda']);
            } else {
              Swal.fire({
                title: 'Ocurrió un error',
                text: 'Vuelva a recargar la página',
              });
            }
          }
          return user;
        }),
        catchError((error)=> this.handlerError(error))
    );
  }

  logout() {
    localStorage.removeItem('token'); //removemos el token
    this.token.next(''); // seteamos la variable del observable a vacio
    this.isUserLoggedIn$.next(false);
    this.idUsuario.next('');
    this.isUserAdmin$.next(false);
    this.utilsSvc.openSidebar(false);
    this.router.navigate(['login']); //redirigimos al login
  }

  checkToken() {
    //para este método se utilizará el auth0-angular-jwt
    const token = localStorage.getItem('token'); //obtenemos el token que tenemos guardada en la sesión

    if (token) {
      const isExpired = helperSvc.isTokenExpired(token); //verificamos si el token está expirado
      //si el token esta expirado, entonces seteamos el token - forma alternairia de un if
      isExpired ? this.logout() : this.token.next(token);
      this.isUserLoggedIn$.next(true);
    } else {
      this.logout();
    }
  }

  SaveLocalStorage(token: string) {
    //este recibirá un token de tipo string
    localStorage.setItem('token', token); //guardamos el token
  }

  //obtenemos el error del backend y lo mostramos en angular
  handlerError(error: any): Observable<never>{
    let errorMessage = "Ocurrio un error";
  
   if(error.error)  errorMessage = `${error.error.message}`;
    else errorMessage = `${error.message}`;
    Swal.fire({
      title: 'Ocurrió un error',
      text: errorMessage,
    });
    return throwError(errorMessage);
  }
}
