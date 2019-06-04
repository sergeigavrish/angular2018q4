import { Action } from "@ngrx/store";

import { Course } from "../models/interfaces/course.interface";

export enum CoursesActionTypes {
  LoadCoursesStarted = "[Courses] LoadCoursesStarted",
  LoadCoursesSucceed = "[Courses] LoadCoursesSucceed",
  LoadCoursesFailed = "[Courses] LoadCoursesFailed",
  LoadCourseByIdStarted = "[Courses] LoadCourseByIdStarted",
  LoadCourseByIdSucceed = "[Courses] LoadCourseByIdSucceed",
  LoadCourseByIdFailed = "[Courses] LoadCourseByIdFailed",
  CreateCourseStarted = "[Courses] CreateCourseStarted",
  CreateCourseSucceed = "[Courses] CreateCourseSucceed",
  CreateCourseFailed = "[Courses] CreateCourseFailed",
  UpdateCourseStarted = "[Courses] UpdateCourseStarted",
  UpdateCourseSucceed = "[Courses] UpdateCourseSucceed",
  UpdateCourseFailed = "[Courses] UpdateCourseFailed",
  DeleteCourseStarted = "[Courses] DeleteCourseStarted",
  DeleteCourseSucceed = "[Courses] DeleteCourseSucceed",
  DeleteCourseFailed = "[Courses] DeleteCourseFailed",
  SearchCoursesStarted = "[Courses] SearchCoursesStarted",
  SearchCoursesSucceed = "[Courses] SearchCoursesSucceed",
  SearchCoursesFailed = "[Courses] SearchCoursesFailed",
  RestoreCoursesStarted = "[Courses] RestoreCoursesStarted",
  RestoreCoursesSucceed = "[Courses] RestoreCoursesSucceed",
  RestoreCoursesFailed = "[Courses] RestoreCoursesFailed",
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

export class LoadCourseByIdStarted implements Action {
  readonly type = CoursesActionTypes.LoadCourseByIdStarted;
  constructor(public payload: string) { }
}

export class LoadCourseByIdSucceed implements Action {
  readonly type = CoursesActionTypes.LoadCourseByIdSucceed;
  constructor(public payload: Course) { }
}

export class LoadCourseByIdFailed implements Action {
  readonly type = CoursesActionTypes.LoadCourseByIdFailed;
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

export class SearchCoursesStarted implements Action {
  readonly type = CoursesActionTypes.SearchCoursesStarted;
  constructor(public payload: string) { }
}

export class SearchCoursesSucceed implements Action {
  readonly type = CoursesActionTypes.SearchCoursesSucceed;
  constructor(public payload: Array<Course>) { }
}

export class SearchCoursesFailed implements Action {
  readonly type = CoursesActionTypes.SearchCoursesFailed;
  constructor() { }
}

export class RestoreCoursesStarted implements Action {
  readonly type = CoursesActionTypes.RestoreCoursesStarted;
  constructor() { }
}

export class RestoreCoursesSucceed implements Action {
  readonly type = CoursesActionTypes.RestoreCoursesSucceed;
  constructor(public payload: Array<Course>) { }
}

export class RestoreCoursesFailed implements Action {
  readonly type = CoursesActionTypes.RestoreCoursesFailed;
  constructor() { }
}

export type CoursesActions = LoadCoursesStarted | LoadCoursesSucceed | LoadCoursesFailed
  | LoadCourseByIdStarted | LoadCourseByIdSucceed | LoadCourseByIdFailed
  | CreateCourseStarted | CreateCourseSucceed | CreateCourseFailed
  | UpdateCourseStarted | UpdateCourseSucceed | UpdateCourseFailed
  | DeleteCourseStarted | DeleteCourseSucceed | DeleteCourseFailed
  | SearchCoursesStarted | SearchCoursesSucceed | SearchCoursesFailed
  | RestoreCoursesStarted | RestoreCoursesSucceed | RestoreCoursesFailed;
