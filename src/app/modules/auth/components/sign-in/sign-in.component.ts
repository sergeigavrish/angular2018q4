import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit, OnDestroy {

  private sub: Subscription;

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

  ngOnDestroy() {
    return this.sub.unsubscribe && this.sub.unsubscribe();
  }

  signIn() {
    console.log(this.signInForm.value);
    this.sub = this.authService.logIn(this.signInForm.value)
      .subscribe(() => {
        const url = this.authService.getRedirectUrl() ? this.authService.getRedirectUrl() : "";
        this.router.navigate([url]);
      });
  }

}
