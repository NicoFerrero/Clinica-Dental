import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"]
})
export class NavigationComponent implements OnInit {
  burger: HTMLDivElement;
  nav: HTMLUListElement;
  navLinks: NodeListOf<HTMLLIElement>;
  user: User = null;
  tipo: string;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.burger = document.querySelector(".burger") as HTMLDivElement;
    this.nav = document.querySelector(".nav-links") as HTMLUListElement;
    this.navLinks = document.querySelectorAll(".nav-links li") as NodeListOf<
      HTMLLIElement
    >;
    this.userService.isLoggedIn().subscribe(
      data => {
        this.user = data;
        if (this.user) {
          this.userService.getUser(this.user.uid).subscribe(usuario => {
            let aux = usuario as User;
            this.tipo = aux.tipo;
            console.log(this.tipo);
          });
        }
      },
      err => console.log(err)
    );
    this.userService.eventAuthError$.subscribe(data => {
      if (data === "exito registro") {
        this.openSnackBar("Se ha registrado con exito", "dismiss", "success");
      } else if (data === "exito turno") {
        this.openSnackBar(
          "Se ha pedido un turno con exito",
          "dismiss",
          "success"
        );
      } else if (data === "exito opinion") {
        this.openSnackBar(
          "Se ha registrado una opinion con exito",
          "dismiss",
          "success"
        );
      } else if (data === "exito cancelar") {
        this.openSnackBar(
          "Se ha cancelado el turno con exito",
          "dismiss",
          "success"
        );
      } else if (data === "exito atencion") {
        this.openSnackBar(
          "Se ha atendido al paciente con exito",
          "dismiss",
          "success"
        );
      } else if (data) {
        this.openSnackBar(data, "dismiss", "error");
      }
    });
  }

  toggleMenu() {
    this.nav.classList.toggle("nav-active");

    this.navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 +
          0.5}s`;
      }
    });

    this.burger.classList.toggle("toggle");
  }

  private openSnackBar(message: string, action: string, hasError: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: [`${hasError}`]
    });
  }

  logOut() {
    this.userService
      .logOut()
      .then(() => {
        console.log("Cerro sesion");
        this.router.navigate([""]);
      })
      .catch(() => console.log("Error al cerrar sesion"));
  }
}
