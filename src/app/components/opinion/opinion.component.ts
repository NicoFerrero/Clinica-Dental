import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";
import { Opinion } from "src/app/models/opinion";

@Component({
  selector: "app-opinion",
  templateUrl: "./opinion.component.html",
  styleUrls: ["./opinion.component.css"]
})
export class OpinionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OpinionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}
  opinion: Opinion;

  ngOnInit() {
    console.log(this.data);
    this.userService.getOpinionTurno(this.data.uid).subscribe(opinion => {
      this.opinion = opinion as Opinion;
    });
  }

  cerrar() {
    this.dialogRef.close();
  }
}
