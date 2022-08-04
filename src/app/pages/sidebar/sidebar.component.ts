import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/carrito.service';
import { DataSharingService } from 'src/app/data-sharing.service';
import { AuthService } from '../Login-Register/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  title = 'e-commerce-angular-node';
  public productos = [];
  isLogin = true;
  isAdmin = true;

  constructor(private carritoService: CarritoService, private authSvc: AuthService,
     private dataSharingService: DataSharingService) {
    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje == "car_updated") {
        this.refrescarCarrito();
      }
    })
  }

  public async refrescarCarrito() {
    this.productos = await this.carritoService.obtenerProductos();
  }

  public total() {
    // Quién te conoce reduce
    let total = 0;
    this.productos.forEach(p => total += p.precio);
    return total;
  }

  ngOnInit(): void {
    this.refrescarCarrito();
    this.verify();
    if (this.authSvc.isUserAdmin$.getValue() == false){
      this.isAdmin = false;
    } else if (this.authSvc.isUserLoggedIn$.getValue() == true){
      this.isAdmin = false;
    }
  }


  public verify() {
    if (this.authSvc.isUserLoggedIn$.getValue() == false) {
     this.isLogin = false;
    } else {
     this.isLogin = true;
    }
 }

}
