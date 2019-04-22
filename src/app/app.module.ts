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
import { AuthService } from "./modules/auth/services/auth.service";
import { AuthInterceptor } from "./modules/auth/interceptors/auth.interceptor";
import { LoaderService } from "./modules/shared/services/loader.service";

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
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (authService: AuthService, loaderService: LoaderService) => new AuthInterceptor(authService, loaderService),
      deps: [AuthService, LoaderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
