import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../pages/Login-Register/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private sidebarOpened= new BehaviorSubject<boolean>(false);
  sidebarOpened$ = this.sidebarOpened.asObservable();

  constructor() { }

  openSidebar(value: boolean): void{
    this.sidebarOpened.next(value);
  }


}
