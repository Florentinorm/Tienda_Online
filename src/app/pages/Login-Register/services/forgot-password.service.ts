import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UserResponse } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  forgotPassword(email: any) {
    return this.http
    .put<UserResponse>(`${environment.API_URL}/forgot-password`, email)
    .pipe(
      map((user:UserResponse)=> {
      return user;
    }),
    catchError((error)=> this.handlerError(error))
    );
  }

  createNewPassword(data: any) {
    return this.http
    .put<UserResponse>(`${environment.API_URL}/new-password`, data)
    .pipe(
      map((user:UserResponse)=> {
      return user;
    }),
    catchError((error)=> this.handlerError(error))
    );
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
