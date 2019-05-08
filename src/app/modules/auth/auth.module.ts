import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { StoreModule } from "@ngrx/store";

import { AuthRoutingModule } from "./auth-routing.module";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { authReducer } from "./store/auth.reducer";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    StoreModule.forFeature("auth", authReducer)
  ],
  declarations: [SignInComponent]
})
export class AuthModule { }
