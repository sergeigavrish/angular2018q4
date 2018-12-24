import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesHomeComponent } from './components/courses-home/courses-home.component';
import { CourseItemComponent } from './components/course-item/course-item.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent,
  },
  {
    path: ':id',
    component: CourseItemComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
