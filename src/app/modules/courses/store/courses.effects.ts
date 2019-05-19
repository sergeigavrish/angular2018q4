import { Injectable, Inject } from "@angular/core";

import { of, pipe } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";

import { Actions, Effect, ofType } from "@ngrx/effects";

import {
  DeleteCourseStarted,
  CoursesActionTypes,
  DeleteCourseSucceed,
  CoursesActions,
  DeleteCourseFailed,
  UpdateCourseStarted,
  UpdateCourseSucceed,
  UpdateCourseFailed,
  CreateCourseStarted,
  CreateCourseSucceed,
  CreateCourseFailed,
  LoadCoursesSucceed,
  LoadCoursesFailed
} from "./courses.actions";
import { CoursesService } from "../services/courses.service";
import { CourseEntity } from "../models/entity/course.entity";
import { Course } from "../models/interfaces/course.interface";
import { select, Store } from "@ngrx/store";
import { selectCourses } from "./courses.selectors";
import { COUNT_TOKEN } from "../providers/count.provider";
import { AppState } from "./../../core/models/interfaces/app-state.interface";

@Injectable()
export class CoursesEffects {

  constructor(
    private actions$: Actions<CoursesActions>,
    private coursesService: CoursesService,
    @Inject(COUNT_TOKEN) private count: number,
    private store: Store<AppState>
  ) { }

  @Effect() loadCourses$ = this.actions$.pipe(
    ofType(CoursesActionTypes.LoadCoursesStarted),
    withLatestFrom(this.store.pipe(select(selectCourses))),
    switchMap(([_, courses]) => {
      const start = this.count * +(courses.length / this.count).toFixed();
      return this.coursesService.loadCourses(start)
        .pipe(
          map(res => {
            if (CourseEntity.isArrayOfCourse(res)) {
              return new LoadCoursesSucceed(res);
            }
            return new LoadCoursesFailed;
          })
        )
        .pipe(this.handleErrorPipe(LoadCoursesFailed));
    })
  );

  @Effect() createCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CreateCourseStarted),
    map((action: CreateCourseStarted) => action.payload),
    switchMap(course => this.coursesService.createCourse(course)
      .pipe(this.handleResponsePipe(CreateCourseSucceed, CreateCourseFailed))
      .pipe(this.handleErrorPipe(CreateCourseFailed))
    )
  );

  @Effect() deleteCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.DeleteCourseStarted),
    map((action: DeleteCourseStarted) => action.payload),
    switchMap(id => this.coursesService.deleteCourse(id)
      .pipe(
        map(res => {
          if (res && typeof res === "string") {
            return new DeleteCourseSucceed(res);
          }
          return new DeleteCourseFailed;
        })
      )
      .pipe(this.handleErrorPipe(DeleteCourseFailed))
    )
  );

  @Effect() updateCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourseStarted),
    map((action: UpdateCourseStarted) => action.payload),
    switchMap(course => this.coursesService.updateCourse(course, course.id)
      .pipe(this.handleResponsePipe(UpdateCourseSucceed, UpdateCourseFailed))
      .pipe(this.handleErrorPipe(UpdateCourseFailed))
    )
  );

  private handleErrorPipe(failed: new () => any) {
    return pipe(
      catchError(error => {
        console.warn(error);
        return of(new failed);
      })
    );
  }

  private handleResponsePipe(
    succeed: new (c: Course) => UpdateCourseSucceed | CreateCourseSucceed,
    failed: new () => UpdateCourseFailed | CreateCourseFailed
  ) {
    return pipe(
      map((res: boolean | Course) => {
        if (CourseEntity.isCourse(res)) {
          return new succeed(res);
        }
        return new failed;
      })
    );
  }

}
