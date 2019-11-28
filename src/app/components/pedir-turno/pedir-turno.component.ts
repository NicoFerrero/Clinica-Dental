import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-pedir-turno",
  templateUrl: "./pedir-turno.component.html",
  styleUrls: ["./pedir-turno.component.css"]
})
export class PedirTurnoComponent implements OnInit {
  turnoForm: FormGroup;
  pacientes: User[];
  especialistas: User[];
  minDate: Date;
  maxHour: number;
  maxHourDOM: string;
  user: User;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // simular sabado this.minDate = new Date(2019,10,30);
    this.userService
      .getUser(this.userService.currentUser().uid)
      .subscribe(user => {
        this.user = user;
        if (this.user.tipo === "paciente") {
          const paciente = this.user.uid;
          this.turnoForm.patchValue({ paciente: paciente });
        }
      });
    this.minDate = new Date();
    if (this.minDate.getDay() === 6) {
      this.maxHour = 14;
      this.maxHourDOM = "14:00";
    } else {
      this.maxHour = 19;
      this.maxHourDOM = "19:00";
    }
    this.userService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
    this.turnoForm = this.fb.group({
      paciente: ["", [Validators.required]],
      especialista: ["", [Validators.required]],
      especialidad: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      hora: [
        "",
        [Validators.required, Validators.min(8), Validators.max(this.maxHour)]
      ]
    });
  }

  change(e) {
    this.userService.getEspecialistasRama(e.value).subscribe(especialistas => {
      this.especialistas = especialistas;
    });
  }

  myFilter(d: Date): boolean {
    const day = d.getDay();
    // Prevent Sunday from being selected.
    return day !== 0;
  }

  onSubmit() {
    const day = this.turnoForm.value.fecha.getDate();
    const month = this.turnoForm.value.fecha.getMonth();
    const year = this.turnoForm.value.fecha.getFullYear();
    const fecha = `${month}/${day}/${year}`;
    console.log(fecha);
    this.turnoForm.patchValue({ fecha: fecha });
    console.log(this.turnoForm.value);
    this.userService.addTurno(this.turnoForm.value).then(() => {
      this.router.navigate(["home"]);
    });
  }
}
