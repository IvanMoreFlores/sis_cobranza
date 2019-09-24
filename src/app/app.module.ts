import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Shared
import { NavbarComponent } from './Components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/registro/usuario/usuario.component';
import { ClienteComponent } from './components/registro/cliente/cliente.component';
import { ServicioComponent } from './components/registro/servicio/servicio.component';

// Pluging
import { DataTablesModule } from 'angular-datatables';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigComponent } from './components/config/config.component';
import { CrearComponent } from './components/convenio/crear/crear.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuarioComponent,
    ClienteComponent,
    ServicioComponent,
    FooterComponent,
    LoginComponent,
    ConfigComponent,
    CrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
