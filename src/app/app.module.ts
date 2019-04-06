import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AuthModule } from "./modules/auth/auth.module";
import { CoreModule } from "./modules/core/core.module";
import { SharedModule } from "./modules/shared/shared.module";
import { UserModule } from "./modules/user/user.module";
import { CoursesModule } from "./modules/courses/courses.module";
import { AppRoutingModule } from "./app-routing.module";
import { InterceptionUrlProvder, INTERCEPTION_URLS_TOKEN } from "./modules/auth/providers/InterceptionUrlProvder";
import { AuthService } from "./modules/auth/services/auth.service";
import { AuthInterceptor } from "./modules/auth/interceptors/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    CoursesModule,
    CoreModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [
    InterceptionUrlProvder,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (authService: AuthService, interceptionUrls: Array<string>) => new AuthInterceptor(authService, interceptionUrls),
      deps: [AuthService, INTERCEPTION_URLS_TOKEN],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
