import { Component, OnInit } from '@angular/core';
import {CarritoService} from "../../carrito.service";
import {DataSharingService} from "../../data-sharing.service";
import { AuthService } from '../Login-Register/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'e-commerce-angular-node';
  public productos = [];
  isLogin = true;
  menuPrincipal=[
    {icon: 'home', name: 'Inicio', route:'home'},
    {icon: 'inventory_2', name: 'Productos', route:'/productos'},
    {icon: 'inventory_', name: 'Ventas', route:'/ventas'}
  ]

  constructor(private carritoService: CarritoService, 
    private authSvc: AuthService,
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
  }



}
