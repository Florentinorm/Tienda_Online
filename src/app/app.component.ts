import {Component, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import {CarritoService} from "./carrito.service";
import {DataSharingService} from "./data-sharing.service";
import { AuthService } from './pages/Login-Register/services/auth.service';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'e-commerce-angular-node';
  public productos = [];
  isLogin = true;
  opened = false;

  private destroy$ = new Subject<any>();
  constructor(private carritoService: CarritoService, private authSvc: AuthService,
     private dataSharingService: DataSharingService, private utilsSvc: UtilsService) {
     }

  ngOnInit(): void {
    this.utilsSvc.sidebarOpened$
    .pipe()
    .subscribe((value:boolean)=>{
      this.opened=value;
    });
  }


  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }


}
