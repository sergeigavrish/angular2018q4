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
import { AuthInterceptor } from "./modules/auth/interceptors/auth.interceptor";
import { LoaderService } from "./modules/core/services/loader.service";

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
      useFactory: (loaderService: LoaderService) => new AuthInterceptor(loaderService),
      deps: [LoaderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
