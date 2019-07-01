import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

import { Observable, of } from "rxjs";
import { map, first, catchError, filter } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { CourseEntity } from "../models/entity/course.entity";
import { AppState } from "./../../core/models/interfaces/app-state.interface";
import { selectCourseById } from "./../store/courses.selectors";

@Injectable()
export class CourseBreadcrumbResolverGuard implements Resolve<string> {

  constructor(
    private store: Store<AppState>
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<string> {

    if (!route.params.courseId) {
      return of("");
    }

    const { courseId } = route.params;

    return this.store.pipe(
      select(selectCourseById(courseId)),
      filter(CourseEntity.isCourse),
      map(c => c.name),
      first(),
      catchError(() => {
        return of("");
      })
    );
  }

}
