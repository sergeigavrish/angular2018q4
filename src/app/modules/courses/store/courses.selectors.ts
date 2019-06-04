import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CoursesState } from "../models/interfaces/courses-state.interface";

const selectCoursesState = createFeatureSelector<CoursesState>("courses");

export const selectCourses = createSelector(
  selectCoursesState,
  state => state.courses
);

export const selectCounter = createSelector(
  selectCoursesState,
  state => state.counter
);

export const selectCourseById = (id: string) => createSelector(
  selectCourses,
  courses => courses.find(c => c.id === id)
);

export const selectCoursesStatus = createSelector(
  selectCoursesState,
  state => state.loading
);
