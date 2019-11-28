import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { PedirTurnoComponent } from "./components/pedir-turno/pedir-turno.component";
import {
  redirectUnauthorizedTo,
  canActivate,
  redirectLoggedInTo,
  AngularFireAuthGuard
} from "@angular/fire/auth-guard";
import { HomeComponent } from "./components/home/home.component";
import { VerTurnosComponent } from "./components/ver-turnos/ver-turnos.component";
import { OpinarTurnoComponent } from "./components/opinar-turno/opinar-turno.component";
import { SalaEsperaComponent } from "./components/sala-espera/sala-espera.component";
import { AtenderTurnoComponent } from "./components/atender-turno/atender-turno.component";
import { TurnoComponent } from "./components/turno/turno.component";
import { EstadisticasTurnosComponent } from "./components/estadisticas-turnos/estadisticas-turnos.component";
import { LogComponent } from "./components/log/log.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["login"]);
const redirectLoggedInToItems = () => redirectLoggedInTo(["home"]);

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: "pedir-turno",
    component: PedirTurnoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "alta-usuario",
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "ver-turnos",
    component: VerTurnosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "opinar/:turno",
    component: OpinarTurnoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "sala-espera",
    component: SalaEsperaComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "atender-turno",
    component: AtenderTurnoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "turno/:turno",
    component: TurnoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "log",
    component: LogComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: "estadisticas",
    component: EstadisticasTurnosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
