import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Turno } from "src/app/models/turno";
import { Router } from "@angular/router";

@Component({
  selector: "app-atender-turno",
  templateUrl: "./atender-turno.component.html",
  styleUrls: ["./atender-turno.component.css"]
})
export class AtenderTurnoComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "fecha",
    "hora",
    "especialidad",
    "paciente",
    "accion"
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  ELEMENT_DATA: Turno[];
  pacientes: User[];
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService
      .getTurnosEspecialista(this.userService.currentUser().uid)
      .subscribe(turnos => {
        this.ELEMENT_DATA = turnos as Turno[];
        this.userService.getPacientes().subscribe(pacientes => {
          this.pacientes = pacientes as User[];
          this.ELEMENT_DATA = turnos;
          for (const turnos in this.ELEMENT_DATA) {
            for (const aux in this.pacientes) {
              if (
                this.ELEMENT_DATA[turnos].paciente == this.pacientes[aux].uid
              ) {
                this.ELEMENT_DATA[turnos].paciente =
                  this.pacientes[aux].nombre +
                  " " +
                  this.pacientes[aux].apellido;
                break;
              }
            }
          }
          this.dataSource.data = this.ELEMENT_DATA;
        });
      });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const turnos in this.ELEMENT_DATA) {
      for (const aux in this.pacientes) {
        if (this.ELEMENT_DATA[turnos].especialista == this.pacientes[aux].uid) {
          this.ELEMENT_DATA[turnos].especialista =
            this.pacientes[aux].nombre + " " + this.pacientes[aux].apellido;
          break;
        }
      }
    }
    this.dataSource.data = changes.ELEMENT_DATA.currentValue;
  }

  atender(turno: string) {
    this.router.navigate(["turno", turno]);
  }
}
