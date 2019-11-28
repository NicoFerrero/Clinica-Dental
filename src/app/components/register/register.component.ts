import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validCaptcha: boolean;
  validFoto: boolean;
  validRegistro: boolean;
  validEspecialista: boolean;
  hide = true;
  user: User;
  tipoUsuario: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService
      .getUser(this.userService.currentUser().uid)
      .subscribe(usuario => {
        this.tipoUsuario = usuario as User;
        if (this.tipoUsuario.tipo === "administrador") {
          this.validCaptcha = true;
        } else {
          this.validCaptcha = false;
        }
      });

    this.validFoto = false;
    this.registerForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.maxLength(12), Validators.minLength(6)]
      ],
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      apellido: ["", [Validators.required, Validators.minLength(3)]],
      tipo: ["", [Validators.required]],
      foto: ["", [Validators.required]],
      especialidad: ["", [Validators.required]]
    });
  }

  verificar(event) {
    if (event !== null) {
      this.validCaptcha = true;
    } else {
      this.validCaptcha = false;
    }
  }

  change(e) {
    if (e.value !== "especialista") {
      this.validEspecialista = false;
      this.registerForm.patchValue({ especialidad: "none" });
    } else {
      this.validEspecialista = true;
    }
  }

  subirArchivo(event: FileList) {
    const file = event.item(0);
    if (file.type.split("/")[0] !== "image") {
      console.log("tipo de archivo no soportado");
    } else {
      const path = "Users/" + this.registerForm.value.email;
      this.userService.subirArchivo(file, path).then(data => {
        if (data["state"] === "success") {
          this.validFoto = true;
        } else {
          this.validFoto = false;
        }
      });
    }
  }

  onSubmit() {
    if (this.tipoUsuario.tipo !== "administrador") {
      this.registerForm.patchValue({ tipo: "paciente" });
    }
    if (this.registerForm.value.tipo !== "especialista") {
      this.registerForm.removeControl("especialidad");
    }

    this.user = this.registerForm.value;
    console.log(this.user);
    this.userService
      .traerArchivo(`Users/${this.registerForm.value.email}`)
      .subscribe(data => {
        this.user.foto = data;
        this.userService.register(this.registerForm.value).then(() => {
          if (this.tipoUsuario.tipo === "paciente") {
            this.userService.logOut();
            this.router.navigate(["/login"]);
          } else {
            this.router.navigate(["/home"]);
          }
        });
      });
  }

  preventDefault(e) {
    e.preventDefault();
  }
}
