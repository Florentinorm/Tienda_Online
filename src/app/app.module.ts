import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ProductosComponent} from './pages/admin/productos/productos.component';
import {ClientesComponent} from './clientes/clientes.component';
import {VentasComponent} from './pages/admin/ventas/ventas.component';
import {TiendaComponent} from './pages/client/tienda/tienda.component';
import {AgregarProductoComponent} from './pages/admin/agregar-producto/agregar-producto.component';
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule} from "@angular/forms";
import {LoadingButtonComponent} from './loading-button/loading-button.component';
import {TarjetaProductoComponent} from './tarjeta-producto/tarjeta-producto.component';
import {MatCardMdImage, MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {DetalleDeProductoComponent} from './pages/client/detalle-de-producto/detalle-de-producto.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import { TerminarCompraComponent } from './pages/client/terminar-compra/terminar-compra.component';
import {MatStepperModule} from "@angular/material/stepper";
import { DetalleDeVentaComponent } from './pages/admin/detalle-de-venta/detalle-de-venta.component';
import { EditarProductoComponent } from './pages/admin/editar-producto/editar-producto.component';
import { AvisoComponent } from './pages/aviso/aviso.component';
import { LoginComponent } from './pages/Login-Register/login/login.component';
import { ForgotPasswordComponent } from './pages/Login-Register/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './pages/Login-Register/create-new-password/create-new-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/Login-Register/registro/registro.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HeaderComponent } from './pages/header/header.component';
import { NavigationComponent } from './pages/Login-Register/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ClientesComponent,
    VentasComponent,
    TiendaComponent,
    AgregarProductoComponent,
    LoadingButtonComponent,
    TarjetaProductoComponent,
    DetalleDeProductoComponent,
    TerminarCompraComponent,
    DetalleDeVentaComponent,
    EditarProductoComponent,
    AvisoComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent,
    HomeComponent,
    RegistroComponent,
    SidebarComponent,
    HeaderComponent,
    NavigationComponent
  ],
  imports: [
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
