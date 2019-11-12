import { ListarComponent } from './components/convenio/listar/listar.component';
import { IndicadorDosComponent } from './components/estadistica/indicador-dos/indicador-dos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UsuarioComponent } from './components/registro/usuario/usuario.component';
import { LoginComponent } from './components/login/login.component';
import { ClienteComponent } from './components/registro/cliente/cliente.component';
import { ServicioComponent } from './components/registro/servicio/servicio.component';
import { ConfigComponent } from './components/config/config.component';
import { CrearComponent } from './components/convenio/crear/crear.component';
import { PagarComponent } from './components/convenio/pagar/pagar.component';
import { DeudaComponent } from './components/convenio/deuda/deuda.component';
import { IndicadorUnoComponent } from './components/estadistica/indicador-uno/indicador-uno.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'servicio', component: ServicioComponent, canActivate: [AuthGuard] },
  { path: 'crear', component: CrearComponent, canActivate: [AuthGuard] },
  { path: 'pagar', component: PagarComponent, canActivate: [AuthGuard] },
  { path: 'deuda', component: DeudaComponent, canActivate: [AuthGuard] },
  { path: 'ind_uno', component: IndicadorUnoComponent, canActivate: [AuthGuard] },
  { path: 'ind_dos', component: IndicadorDosComponent, canActivate: [AuthGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [AuthGuard] },
  { path: 'listar', component: ListarComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
