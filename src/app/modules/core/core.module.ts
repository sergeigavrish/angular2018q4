import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";

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
import { AuthModule } from "../auth/auth.module";
import { CoursesModule } from "../courses/courses.module";
import { UserModule } from "../user/user.module";
import { metaReducers } from "./store/metaReducer";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}, { metaReducers }),
    AuthModule,
    CoursesModule,
    UserModule,
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
