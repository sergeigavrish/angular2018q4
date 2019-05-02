import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import {
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  MainLayoutComponent,
  PathNotFoundComponent,
  LoaderComponent,
  SearchPanelComponent
} from "./components";
import { SearchService } from "./services/search.service";

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
    LoaderComponent,
    SearchPanelComponent
  ],
  providers: [SearchService],
  exports: [MainLayoutComponent]
})
export class CoreModule { }
