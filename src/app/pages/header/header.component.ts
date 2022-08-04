import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { CarritoService } from 'src/app/carrito.service';
import { DataSharingService } from 'src/app/data-sharing.service';
import { AuthService } from '../Login-Register/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<any>();
  isLogged = false;
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private carritoService: CarritoService, private authSvc: AuthService,
    private dataSharingService: DataSharingService) {
   // Comunicación entre componentes
   this.dataSharingService.currentMessage.subscribe(mensaje => {
     if (mensaje == "car_updated") {
       this.refrescarCarrito();
     }
   })
 }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authSvc.token$
    .pipe()
    .subscribe((token: string)=>{

        if(token!=""){
          this.isLogged=true;
        }else{
          this.isLogged=false;
        }
    });
    this.refrescarCarrito();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout(){
   this.authSvc.logout();
  }


  public productos = [];
  isLogin = true;


  public async refrescarCarrito() {
    this.productos = await this.carritoService.obtenerProductos();
  }

  public total() {
    // Quién te conoce reduce
    let total = 0;
    this.productos.forEach(p => total += (p.precio * p.cantidad));
    return total;
  }

}
