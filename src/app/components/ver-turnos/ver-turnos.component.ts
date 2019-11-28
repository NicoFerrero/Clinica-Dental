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
import { MatDialog } from "@angular/material";
import { OpinionComponent } from "../opinion/opinion.component";

@Component({
  selector: "app-ver-turnos",
  templateUrl: "./ver-turnos.component.html",
  styleUrls: ["./ver-turnos.component.css"]
})
export class VerTurnosComponent implements OnInit, OnChanges {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "fecha",
    "hora",
    "especialidad",
    "especialista",
    "opinion",
    "verOpinion",
    "estado"
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  ELEMENT_DATA: Turno[];
  especialistas: User[];
  constructor(
    private userService: UserService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService
      .getTurnos(this.userService.currentUser().uid)
      .subscribe(turnos => {
        this.ELEMENT_DATA = turnos as Turno[];
        this.userService.getEspecialistas().subscribe(especialistas => {
          this.especialistas = especialistas as User[];
          this.ELEMENT_DATA = turnos;
          for (const turnos in this.ELEMENT_DATA) {
            for (const aux in this.especialistas) {
              if (
                this.ELEMENT_DATA[turnos].especialista ==
                this.especialistas[aux].uid
              ) {
                this.ELEMENT_DATA[turnos].especialista =
                  this.especialistas[aux].nombre +
                  " " +
                  this.especialistas[aux].apellido;
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
      for (const aux in this.especialistas) {
        if (
          this.ELEMENT_DATA[turnos].especialista == this.especialistas[aux].uid
        ) {
          this.ELEMENT_DATA[turnos].especialista =
            this.especialistas[aux].nombre +
            " " +
            this.especialistas[aux].apellido;
          break;
        }
      }
    }
    this.dataSource.data = changes.ELEMENT_DATA.currentValue;
  }

  opinar(turno: string) {
    this.router.navigate(["opinar", turno]);
  }

  verOpinion(turno: string) {
    this.matDialog.open(OpinionComponent, {
      width: "300px",
      data: { uid: turno }
    });
  }
}
