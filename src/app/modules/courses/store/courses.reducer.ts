import {
  CoursesActions,
  CoursesActionTypes,
  LoadCoursesSucceed,
  UpdateCourseSucceed,
  DeleteCourseSucceed,
  CreateCourseSucceed
} from "./courses.actions";
import { CoursesState } from "../models/interfaces/courses-state.interface";

const initialState: CoursesState = {
  courses: []
};

const handleGetCourses = (state: CoursesState, action: LoadCoursesSucceed): CoursesState => {
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

const handleCreateCourse = (state: CoursesState, action: CreateCourseSucceed) => {
  return {
    ...state,
    courses: state.courses.concat(action.payload)
  };
};

const handleUpdateCourse = (state: CoursesState, action: UpdateCourseSucceed) => {
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

const handleDeleteCourse = (state: CoursesState, action: DeleteCourseSucceed) => {
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

export function coursesReducer(state = initialState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LoadCoursesSucceed:
      return handleGetCourses(state, action);
    case CoursesActionTypes.CreateCourseSucceed:
      return handleCreateCourse(state, action);
    case CoursesActionTypes.UpdateCourseSucceed:
      return handleUpdateCourse(state, action);
    case CoursesActionTypes.DeleteCourseSucceed:
      return handleDeleteCourse(state, action);
    default:
      return state;
  }
}
