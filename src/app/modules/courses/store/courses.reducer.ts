import {
  CoursesActions,
  CoursesActionTypes,
  CreateCourse,
  DeleteCourse,
  LoadCourses,
  UpdateCourse
} from "./courses.actions";
import { CoursesState } from "../models/interfaces/courses-state.interface";

const initialState: CoursesState = {
  courses: []
};

export function coursesReducer(state = initialState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LoadCourses:
      return handleGetCourses(state, action);
    case CoursesActionTypes.CreateCourse:
      return handleCreateCourse(state, action);
    case CoursesActionTypes.UpdateCourse:
      return handleUpdateCourse(state, action);
    case CoursesActionTypes.DeleteCourse:
      return handleDeleteCourse(state, action);
    default:
      return state;
  }
}

const handleGetCourses = (state: CoursesState, action: LoadCourses): CoursesState => {
  return {
    ...state,
    courses: action.payload.reduce((acc, course) => {
      if (!acc.some(c => c.id === course.id)) {
        acc = acc.concat(course);
      }
      return acc;
    }, state.courses)
  };
};

const handleCreateCourse = (state: CoursesState, action: CreateCourse) => {
  return {
    ...state,
    courses: state.courses.concat(action.payload)
  };
};

const handleUpdateCourse = (state: CoursesState, action: UpdateCourse) => {
  const course = action.payload;
  const { courses } = state;
  const index = courses.findIndex(c => c.id === course.id);
  return {
    ...state,
    courses: [
      ...courses.slice(0, index),
      course,
      ...courses.slice(index + 1),
    ]
  };
};

const handleDeleteCourse = (state: CoursesState, action: DeleteCourse) => {
  const { courses } = state;
  const index = courses.findIndex(c => c.id === action.payload);
  return {
    ...state,
    courses: [
      ...courses.slice(0, index),
      ...courses.slice(index + 1)
    ]
  };
};
