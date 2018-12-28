import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserModule } from "./modules/user/user.module";
import { SharedModule } from "./modules/shared/shared.module";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { BreadcrumpsComponent } from "./components/breadcrumps/breadcrumps.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumpsComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
