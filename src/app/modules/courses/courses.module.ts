import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";

import { EffectsModule } from "@ngrx/effects";

import { BorderColorDirective } from "./directives/border-color.directive";
import { borderColorProvider } from "./providers/border-color.provider";
import {
  CourseFormComponent,
  FormActionsComponent,
  FormDatepickerComponent,
  FormDescriptionComponent,
  FormDurationComponent,
  FormTitleComponent,
  FormWrapperComponent
} from "./components";
import {
  CourseDeleteComponent,
  CourseItemComponent,
  CoursesHomeComponent,
  CoursesListComponent
} from "./components";
import { CoursesRoutingModule } from "./courses-routing.module";
import { DurationPipe } from "./pipes/duration.pipe";
import { FilterPipe } from "./pipes/filter.pipe";
import { OrderByPipe } from "./pipes/order-by.pipe";
import { SharedModule } from "../shared/shared.module";
import { StorageProvider } from "./providers/storage.provider";
import { coursesReducer } from "./store/courses.reducer";
import { CountProvider } from "./providers/count.provider";
import { CoursesEffects } from "./store/courses.effects";

@NgModule({
  declarations: [
    CoursesHomeComponent,
    CourseItemComponent,
    BorderColorDirective,
    DurationPipe,
    FilterPipe,
    OrderByPipe,
    CourseDeleteComponent,
    CoursesListComponent,
    CourseFormComponent,
    FormDatepickerComponent,
    FormDurationComponent,
    FormWrapperComponent,
    FormDescriptionComponent,
    FormTitleComponent,
    FormActionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature("courses", coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
    CoursesRoutingModule,
  ],
  entryComponents: [CourseDeleteComponent],
  providers: [
    borderColorProvider,
    StorageProvider,
    CountProvider
  ]
})
export class CoursesModule { }
