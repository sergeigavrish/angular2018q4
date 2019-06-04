import { Injectable, Inject } from "@angular/core";

import { of, pipe } from "rxjs";
import { switchMap, map, catchError, withLatestFrom } from "rxjs/operators";

import { select, Store } from "@ngrx/store";
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
  LoadCoursesFailed,
  LoadCourseByIdStarted,
  LoadCourseByIdFailed,
  LoadCourseByIdSucceed,
  SearchCoursesStarted,
  SearchCoursesFailed,
  SearchCoursesSucceed,
  RestoreCoursesSucceed,
  RestoreCoursesFailed,
} from "./courses.actions";
import { CoursesService } from "../services/courses.service";
import { CourseEntity } from "../models/entity/course.entity";
import { Course } from "../models/interfaces/course.interface";
import { selectCourses, selectCounter } from "./courses.selectors";
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
        .pipe(this.handleResponsePipe<Array<Course>>(
          LoadCoursesSucceed,
          LoadCoursesFailed,
          CourseEntity.isArrayOfCourse
        ))
        .pipe(this.handleErrorPipe(LoadCoursesFailed));
    })
  );

  @Effect() createCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.CreateCourseStarted),
    map((action: CreateCourseStarted) => action.payload),
    switchMap(course => this.coursesService.createCourse(course)
      .pipe(this.handleResponsePipe<Course>(
        CreateCourseSucceed,
        CreateCourseFailed,
        CourseEntity.isCourse
      ))
      .pipe(this.handleErrorPipe(CreateCourseFailed))
    )
  );

  @Effect() deleteCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.DeleteCourseStarted),
    map((action: DeleteCourseStarted) => action.payload),
    switchMap(id => this.coursesService.deleteCourse(id)
      .pipe(this.handleResponsePipe<string>(
        DeleteCourseSucceed,
        DeleteCourseFailed,
        (s: any): s is string => s && typeof s === "string"
      ))
      .pipe(this.handleErrorPipe(DeleteCourseFailed))
    )
  );

  @Effect() updateCourse$ = this.actions$.pipe(
    ofType(CoursesActionTypes.UpdateCourseStarted),
    map((action: UpdateCourseStarted) => action.payload),
    switchMap(course => this.coursesService.updateCourse(course, course.id)
      .pipe(this.handleResponsePipe<Course>(
        UpdateCourseSucceed,
        UpdateCourseFailed,
        CourseEntity.isCourse
      ))
      .pipe(this.handleErrorPipe(UpdateCourseFailed))
    )
  );

  @Effect() loadCourseById$ = this.actions$.pipe(
    ofType(CoursesActionTypes.LoadCourseByIdStarted),
    map((action: LoadCourseByIdStarted) => action.payload),
    switchMap(id => this.coursesService.loadCourseById(id)
      .pipe(this.handleResponsePipe<Course>(
        LoadCourseByIdSucceed,
        LoadCourseByIdFailed,
        CourseEntity.isCourse
      ))
      .pipe(this.handleErrorPipe(LoadCourseByIdFailed))
    )
  );

  @Effect() searchCourses$ = this.actions$.pipe(
    ofType(CoursesActionTypes.SearchCoursesStarted),
    map((action: SearchCoursesStarted) => action.payload),
    switchMap(v => this.coursesService.searchCourses(v)
      .pipe(this.handleResponsePipe<Array<Course>>(
        SearchCoursesSucceed,
        SearchCoursesFailed,
        CourseEntity.isArrayOfCourse
      ))
      .pipe(this.handleErrorPipe(SearchCoursesFailed))
    )
  );

  @Effect() restoreCourses$ = this.actions$.pipe(
    ofType(CoursesActionTypes.RestoreCoursesStarted),
    withLatestFrom(this.store.pipe(select(selectCounter))),
    switchMap(([_, counter]) => this.coursesService.loadCourses(0, counter)
      .pipe(this.handleResponsePipe<Array<Course>>(
        RestoreCoursesSucceed,
        RestoreCoursesFailed,
        CourseEntity.isArrayOfCourse
      ))
      .pipe(this.handleErrorPipe(RestoreCoursesFailed))
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

  private handleResponsePipe<T>(
    succeed: new (c: T) => any,
    failed: new () => any,
    predicate: (d?: any) => d is T
  ) {
    return pipe(
      map((res: any) => {
        if (predicate(res)) {
          return new succeed(res);
        }
        return new failed;
      })
    );
  }

}
