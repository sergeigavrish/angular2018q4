import { Action } from "@ngrx/store";

import { Course } from "../models/interfaces/course.interface";

export enum CoursesActionTypes {
  LoadCoursesStarted = "[Courses] LoadCoursesStarted",
  LoadCoursesSucceed = "[Courses] LoadCoursesSucceed",
  LoadCoursesFailed = "[Courses] LoadCoursesFailed",
  CreateCourseStarted = "[Courses] CreateCourseStarted",
  CreateCourseSucceed = "[Courses] CreateCourseSucceed",
  CreateCourseFailed = "[Courses] CreateCourseFailed",
  UpdateCourseStarted = "[Courses] UpdateCourseStarted",
  UpdateCourseSucceed = "[Courses] UpdateCourseSucceed",
  UpdateCourseFailed = "[Courses] UpdateCourseFailed",
  DeleteCourseStarted = "[Courses] DeleteCourseStarted",
  DeleteCourseSucceed = "[Courses] DeleteCourseSucceed",
  DeleteCourseFailed = "[Courses] DeleteCourseFailed",
}

export class LoadCoursesStarted implements Action {
  readonly type = CoursesActionTypes.LoadCoursesStarted;
  constructor() { }
}

export class LoadCoursesSucceed implements Action {
  readonly type = CoursesActionTypes.LoadCoursesSucceed;
  constructor(public payload: Array<Course>) { }
}

export class LoadCoursesFailed implements Action {
  readonly type = CoursesActionTypes.LoadCoursesFailed;
  constructor() { }
}

export class CreateCourseStarted implements Action {
  readonly type = CoursesActionTypes.CreateCourseStarted;
  constructor(public payload: Course) { }
}

export class CreateCourseSucceed implements Action {
  readonly type = CoursesActionTypes.CreateCourseSucceed;
  constructor(public payload: Course) { }
}

export class CreateCourseFailed implements Action {
  readonly type = CoursesActionTypes.CreateCourseFailed;
  constructor() { }
}
export class UpdateCourseStarted implements Action {
  readonly type = CoursesActionTypes.UpdateCourseStarted;
  constructor(public payload: Course) { }
}

export class UpdateCourseSucceed implements Action {
  readonly type = CoursesActionTypes.UpdateCourseSucceed;
  constructor(public payload: Course) { }
}

export class UpdateCourseFailed implements Action {
  readonly type = CoursesActionTypes.UpdateCourseFailed;
  constructor() { }
}

export class DeleteCourseStarted implements Action {
  readonly type = CoursesActionTypes.DeleteCourseStarted;
  constructor(public payload: string) { }
}

export class DeleteCourseSucceed implements Action {
  readonly type = CoursesActionTypes.DeleteCourseSucceed;
  constructor(public payload: string) { }
}

export class DeleteCourseFailed implements Action {
  readonly type = CoursesActionTypes.DeleteCourseFailed;
  constructor() { }
}

export type CoursesActions = LoadCoursesStarted | LoadCoursesSucceed | LoadCoursesFailed
  | CreateCourseStarted | CreateCourseSucceed | CreateCourseFailed
  | UpdateCourseStarted | UpdateCourseSucceed | UpdateCourseFailed
  | DeleteCourseStarted | DeleteCourseSucceed | DeleteCourseFailed;
