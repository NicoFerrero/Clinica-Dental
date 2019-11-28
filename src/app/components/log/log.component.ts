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
import * as jsPDF from "jspdf";
import "jspdf-autotable";
import { UserOptions } from "jspdf-autotable";

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
  save(arg0: string);
}

@Component({
  selector: "app-log",
  templateUrl: "./log.component.html",
  styleUrls: ["./log.component.css"]
})
export class LogComponent implements OnInit, OnChanges {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ["fechaHora", "displayName", "tipo"];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  ELEMENT_DATA: any[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getLogs().subscribe(logs => {
      this.ELEMENT_DATA = logs;
      this.dataSource.data = this.ELEMENT_DATA;
    });

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.ELEMENT_DATA.currentValue;
  }

  getDataPDF(materias: any[]) {
    const body = [];
    for (let i = 0; i < materias.length; i++) {
      body.push([
        materias[i]["fechaHora"],
        materias[i]["displayName"],
        materias[i]["tipo"]
      ]);
    }
    return body;
  }

  descargarPDF() {
    const doc = new jsPDF("portrait", "px", "a4") as jsPDFWithPlugin;
    doc.autoTable({
      head: [["Fecha y Hora", "Nombre y Apellido", "Tipo de Usuario"]],
      body: this.getDataPDF(this.ELEMENT_DATA)
    });
    doc.save("Logs");
  }
}
