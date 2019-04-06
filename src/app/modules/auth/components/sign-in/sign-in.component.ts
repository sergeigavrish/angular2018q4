import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {

  signInForm = new FormGroup({
    login: new FormControl(""),
    password: new FormControl(""),
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  signIn() {
    console.log(this.signInForm.value);
    this.authService.logIn(this.signInForm.value);
    const url = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : "";
    this.router.navigate([url]);
  }

}
