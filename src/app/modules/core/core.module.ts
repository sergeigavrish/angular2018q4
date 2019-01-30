import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BreadcrumpsComponent } from "./components/breadcrumps/breadcrumps.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumpsComponent,
    FooterComponent,
    MainLayoutComponent,
  ],
  exports: [ MainLayoutComponent ]
})
export class CoreModule { }
