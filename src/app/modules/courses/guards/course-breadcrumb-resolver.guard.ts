import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";

import { Observable, of } from "rxjs";
import { map, first, catchError } from "rxjs/operators";

import { CoursesService } from "../services/courses.service";
import { CourseEntity } from "../models/entity/course.entity";

@Injectable()
export class CourseBreadcrumbResolverGuard implements Resolve<string> {

  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<string> {

    if (!route.params.courseId) {
      return of("");
    }

    const { courseId } = route.params;

    return this.coursesService.loadCourseById(courseId).pipe(
      map((course: CourseEntity) => {
        return course.name;
      }),
      first(),
      catchError(() => {
        this.router.navigate(["/courses"]);
        return of("");
      })
    );
  }

}
