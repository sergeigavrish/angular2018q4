import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";

import { Observable, of } from "rxjs";
import { catchError, first, tap, filter } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { AppState } from "./../../core/models/interfaces/app-state.interface";
import { CourseEntity } from "./../models/entity/course.entity";
import { selectCourseById } from "../store/courses.selectors";
import { Course } from "../models/interfaces/course.interface";
import { LoadCourseByIdStarted } from "./../store/courses.actions";

@Injectable()
export class CourseResolverGuard implements Resolve<Course> {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Course | null> {

    if (!route.params.courseId) {
      return of(null);
    }

    const { courseId } = route.params;

    return this.store.pipe(
      select(selectCourseById(courseId)),
      tap(с => {
        if (!с) {
          this.store.dispatch(new LoadCourseByIdStarted(courseId));
        }
      }),
      filter(CourseEntity.isCourse),
      first(),
      catchError(() => {
        this.router.navigate(["/courses"]);
        return of(null);
      })
    );
  }
}
