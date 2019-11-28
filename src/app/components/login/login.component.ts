import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.maxLength(12), Validators.minLength(6)]
      ]
    });
  }

  onSubmit() {
    this.userService.login(this.loginForm.value);
  }

  preventDefault(e) {
    e.preventDefault();
  }
}
