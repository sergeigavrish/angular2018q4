import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {
  CourseDeleteComponent,
  CourseEditComponent,
  CourseItemComponent,
  CoursesHomeComponent,
  CoursesListComponent
} from "./components";
import { BorderColorDirective } from "./directives/border-color.directive";
import { borderColorProvider } from "./providers/border-color.provider";
import { CoursesRoutingModule } from "./courses-routing.module";
import { DurationPipe } from "./pipes/duration.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { SharedModule } from "../shared/shared.module";
import { StorageProvider } from "./providers/storage.provider";

@NgModule({
  declarations: [
    CoursesHomeComponent,
    CourseItemComponent,
    BorderColorDirective,
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    CourseDeleteComponent,
    CourseEditComponent,
    CoursesListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
  ],
  entryComponents: [CourseDeleteComponent, CourseEditComponent],
  providers: [
    borderColorProvider,
    StorageProvider
  ]
})
export class CoursesModule { }
