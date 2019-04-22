import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  MainLayoutComponent,
  PathNotFoundComponent,
  LoaderComponent
} from "./components";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    FooterComponent,
    MainLayoutComponent,
    PathNotFoundComponent,
    LoaderComponent
  ],
  exports: [MainLayoutComponent]
})
export class CoreModule { }
