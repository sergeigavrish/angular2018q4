import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import {
  BreadcrumbsComponent,
  FooterComponent,
  HeaderComponent,
  MainLayoutComponent,
  PathNotFoundComponent,
  LoaderComponent,
  SearchPanelComponent
} from "./components";
import { AuthModule } from "../auth/auth.module";
import { CoursesModule } from "../courses/courses.module";
import { UserModule } from "../user/user.module";
import { metaReducers } from "./store/meta.reducer";
import { environment } from "../../../environments/environment";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
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
  exports: [MainLayoutComponent]
})
export class CoreModule { }
