import { Action } from "@ngrx/store";

import { Course } from "../models/interfaces/course.interface";

export enum CoursesActionTypes {
  LoadCourses = "[Courses] LoadCourses",
  CreateCourse = "[Courses] CreateCourse",
  UpdateCourse = "[Courses] UpdateCourse",
  DeleteCourse = "[Courses] DeleteCourse"
}

export class LoadCourses implements Action {
  readonly type = CoursesActionTypes.LoadCourses;
  constructor(public payload: Array<Course>) { }
}

export class CreateCourse implements Action {
  readonly type = CoursesActionTypes.CreateCourse;
  constructor(public payload: Course) { }
}

export class UpdateCourse implements Action {
  readonly type = CoursesActionTypes.UpdateCourse;
  constructor(public payload: Course) { }
}

export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DeleteCourse;
  constructor(public payload: string) { }
}

export type CoursesActions = LoadCourses | CreateCourse | UpdateCourse | DeleteCourse;
