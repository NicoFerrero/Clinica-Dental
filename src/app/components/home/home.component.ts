import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService
      .getUser(this.userService.currentUser().uid)
      .subscribe(usuario => {
        this.user = usuario as User;
        switch (this.user.tipo) {
          case "paciente":
          case "recepcionista":
            this.router.navigate(["pedir-turno"]);
            break;
          case "administrador":
            this.router.navigate(["log"]);
            break;
          case "especialista":
            this.router.navigate(["atender-turno"]);
            break;
        }
      });
  }
}
