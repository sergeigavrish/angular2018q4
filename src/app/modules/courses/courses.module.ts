import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesHomeComponent } from "./components/courses-home/courses-home.component";
import { CoursesListComponent } from "./components/courses-list/courses-list.component";
import { CourseItemComponent } from "./components/course-item/course-item.component";
import { CoursesRoutingModule } from "./courses-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CoursesHomeComponent, CoursesListComponent, CourseItemComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CoursesModule { }
