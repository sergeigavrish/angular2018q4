import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, first, map } from "rxjs/operators";
import { CourseEntity } from "./../models/entity/course.entity";
import { CoursesService } from "./../services/courses.service";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable()
export class CourseResolverGuard implements Resolve<CourseEntity> {
  constructor(
    private coursesService: CoursesService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<CourseEntity | null> {

    if (!route.params.courseId) {
      return of(null);
    }

    const { courseId } = route.params;

    return this.coursesService.loadCourseById(courseId).pipe(
      map((course: CourseEntity) => {
        if (course) {
          return course;
        } else {
          this.router.navigate(["/courses"]);
          return null;
        }
      }),
      first(),
      catchError(() => {
        this.router.navigate(["/courses"]);
        return of(null);
      })
    );
  }
}
