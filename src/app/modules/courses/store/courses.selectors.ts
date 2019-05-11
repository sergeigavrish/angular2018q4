import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CoursesState } from "../models/interfaces/courses-state.interface";

const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourses = createSelector(
  selectCoursesState,
  state => state.courses
);
