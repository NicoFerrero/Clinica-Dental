import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecaptchaModule } from "ng-recaptcha";

//componentes
import { RegisterComponent } from "./components/register/register.component";
import { CaptchaComponent } from "./components/captcha/captcha.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { LoginComponent } from "./components/login/login.component";
import { PedirTurnoComponent } from "./components/pedir-turno/pedir-turno.component";
import { HomeComponent } from "./components/home/home.component";
import { VerTurnosComponent } from "./components/ver-turnos/ver-turnos.component";
import { OpinarTurnoComponent } from "./components/opinar-turno/opinar-turno.component";
import { SalaEsperaComponent } from "./components/sala-espera/sala-espera.component";
import { OpinionComponent } from "./components/opinion/opinion.component";

//angular material
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatTabsModule } from "@angular/material/tabs";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatDialogModule } from "@angular/material/dialog";
import { MatChipsModule } from "@angular/material/chips";

//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";

//servicios
import { UserService } from "./services/user.service";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AtenderTurnoComponent } from './components/atender-turno/atender-turno.component';
import { TurnoComponent } from './components/turno/turno.component';
import { EstadisticasTurnosComponent } from './components/estadisticas-turnos/estadisticas-turnos.component';
import { LogComponent } from './components/log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CaptchaComponent,
    NavigationComponent,
    LoginComponent,
    PedirTurnoComponent,
    HomeComponent,
    VerTurnosComponent,
    OpinarTurnoComponent,
    SalaEsperaComponent,
    OpinionComponent,
    AtenderTurnoComponent,
    TurnoComponent,
    EstadisticasTurnosComponent,
    LogComponent
  ],
  entryComponents: [OpinionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatChipsModule,
    MatDatepickerModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    RecaptchaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatNativeDateModule
  ],
  providers: [UserService, AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
