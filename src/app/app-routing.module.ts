import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductosComponent} from './pages/admin/productos/productos.component';
import {ClientesComponent} from './clientes/clientes.component';
import {VentasComponent} from './pages/admin/ventas/ventas.component';
import {TiendaComponent} from './pages/client/tienda/tienda.component';
import {AgregarProductoComponent} from "./pages/admin/agregar-producto/agregar-producto.component";
import {DetalleDeProductoComponent} from "./pages/client/detalle-de-producto/detalle-de-producto.component";
import {TerminarCompraComponent} from "./pages/client/terminar-compra/terminar-compra.component";
import {DetalleDeVentaComponent} from "./pages/admin/detalle-de-venta/detalle-de-venta.component";
import { AvisoComponent } from './pages/aviso/aviso.component';
import { LoginComponent } from './pages/Login-Register/login/login.component';
import { ForgotPasswordComponent } from './pages/Login-Register/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './pages/Login-Register/create-new-password/create-new-password.component';
import { RegistroComponent } from './pages/Login-Register/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckAdminGuard } from './pages/guards/check-admin.guard';
import { AuthGuard } from './pages/guards/check-auth.guard';


const routes: Routes = [
  
  {path: "login", component: LoginComponent},
  {path: "register", component: RegistroComponent},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "forgot-password", component: ForgotPasswordComponent},
  {path: "create-new-password/:token", component: CreateNewPasswordComponent},
  {path: 'productos', component: ProductosComponent, canActivate: [CheckAdminGuard]},
  {path: 'productos/agregar', component: AgregarProductoComponent, canActivate: [CheckAdminGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'ventas', component: VentasComponent, canActivate: [CheckAdminGuard]},
  {path: 'tienda', component: TiendaComponent,canActivate: [AuthGuard]},
  {path: 'producto/detalle/:id', component: DetalleDeProductoComponent, canActivate: [AuthGuard]},
  {path: 'terminar_compra', component: TerminarCompraComponent, canActivate: [AuthGuard]},
  {path: 'detalle-venta/:id', component: DetalleDeVentaComponent, canActivate: [AuthGuard]},
  {path: 'aviso', component: AvisoComponent, canActivate: [AuthGuard]},



  //{path: '', redirectTo: "/tienda", pathMatch: "full"},
  {path: '**', redirectTo: "/login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
