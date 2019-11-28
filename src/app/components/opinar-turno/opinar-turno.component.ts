import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Turno } from "src/app/models/turno";
import { UserService } from "src/app/services/user.service";
import { Opinion } from "src/app/models/opinion";

@Component({
  selector: "app-opinar-turno",
  templateUrl: "./opinar-turno.component.html",
  styleUrls: ["./opinar-turno.component.css"]
})
export class OpinarTurnoComponent implements OnInit {
  turnoUid: string;
  clinicaOpinion: number;
  especialistaOpinion: number;
  opinion: string;
  turno: Turno;
  validClinica: boolean;
  validEspecialista: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validClinica = false;
    this.validEspecialista = false;
    this.route.paramMap.subscribe(params => {
      this.turnoUid = params.get("turno");
      this.userService.getTurno(this.turnoUid).subscribe(data => {
        this.turno = data as Turno;
      });
    });
  }

  clinica(value) {
    this.clinicaOpinion = value;
    this.validClinica = true;
  }

  especialista(value) {
    this.especialistaOpinion = value;
    this.validEspecialista = true;
  }

  opinar() {
    const opinion: Opinion = {
      paciente: this.turno[0].paciente,
      especialista: this.especialistaOpinion,
      clinica: this.clinicaOpinion,
      opinion: this.opinion,
      turno: this.turno[0].uid
    };
    this.userService.addOpinion(opinion).then(() => {
      this.router.navigate(["ver-turnos"]);
    });
  }
}
