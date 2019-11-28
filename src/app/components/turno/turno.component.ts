import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Turno } from "src/app/models/turno";
import { Comentario } from "src/app/models/comentario";

@Component({
  selector: "app-turno",
  templateUrl: "./turno.component.html",
  styleUrls: ["./turno.component.css"]
})
export class TurnoComponent implements OnInit {
  turnoForm: FormGroup;
  turnoUid: string;
  turno: Turno;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.turnoForm = this.fb.group({
      comentariosEspecialista: [
        "",
        [Validators.required, Validators.minLength(3)]
      ],
      consultorio: ["", [Validators.required]]
    });
    this.route.paramMap.subscribe(params => {
      this.turnoUid = params.get("turno");
      this.userService.getTurno(this.turnoUid).subscribe(data => {
        this.turno = data[0] as Turno;
        console.log(this.turno);
      });
    });
  }

  onSubmit() {
    const atencion: Comentario = {
      turno: this.turno.uid,
      paciente: this.turno.paciente,
      especialista: this.turno.especialista,
      comentario: this.turnoForm.value.comentariosEspecialista,
      consultorio: this.turnoForm.value.consultorio
    };

    this.userService.atenderTurno(this.turno.uid, atencion).then(() => {
      this.router.navigate(["atender-turno"]);
    });
  }
}
