import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CoursesHomeComponent, CourseFormComponent } from "./components";
import { CourseResolverGuard } from "./guards/course-resolver.guard";
import { AuthGuard } from "../auth/guards/auth.guard";

const routes: Routes = [
  {
    path: "courses",
    component: CoursesHomeComponent,
    data: {
      title: "Courses",
      breadcrumb: "Courses"
    },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "new",
        component: CourseFormComponent,
        data: {
          breadcrumb: "Add course"
        },
        resolve: {
          course: CourseResolverGuard
        }
      },
      {
        path: ":courseId",
        component: CourseFormComponent,
        resolve: {
          course: CourseResolverGuard,
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CourseResolverGuard]
})
export class CoursesRoutingModule { }
