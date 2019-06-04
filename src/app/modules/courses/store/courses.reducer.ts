import {
  CoursesActions,
  CoursesActionTypes,
  LoadCoursesSucceed,
  UpdateCourseSucceed,
  DeleteCourseSucceed,
  CreateCourseSucceed,
  LoadCourseByIdSucceed,
  SearchCoursesSucceed,
  RestoreCoursesSucceed,
} from "./courses.actions";
import { CoursesState } from "../models/interfaces/courses-state.interface";
import { ReqStatus } from "./../../shared/types/index";

const initialState: CoursesState = {
  courses: [],
  loading: ReqStatus.empty,
  counter: 0
};

const handleGetCourses = (state: CoursesState, action: LoadCoursesSucceed): CoursesState => {
  return {
    ...state,
    loading: ReqStatus.success,
    courses: action.payload.reduce((acc, course) => {
      if (!acc.some(c => c.id === course.id)) {
        acc = acc.concat(course);
      }
      return acc;
    }, state.courses),
    counter: state.courses.length + action.payload.length
  };
};

const handleSingleCourse = (state: CoursesState, action: CreateCourseSucceed | LoadCourseByIdSucceed) => {
  return {
    ...state,
    loading: ReqStatus.success,
    courses: state.courses.concat(action.payload)
  };
};

const handleUpdateCourse = (state: CoursesState, action: UpdateCourseSucceed) => {
  const course = action.payload;
  const { courses } = state;
  const index = courses.findIndex(c => c.id === course.id);
  return {
    ...state,
    loading: ReqStatus.success,
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
    loading: ReqStatus.success,
    courses: [
      ...courses.slice(0, index),
      ...courses.slice(index + 1)
    ]
  };
};

const handleSearchCourses = (state: CoursesState, action: SearchCoursesSucceed) => {
  return {
    ...state,
    courses: action.payload,
    loading: ReqStatus.success
  };
}
  ;
const handleRestoreCourses = (state: CoursesState, action: RestoreCoursesSucceed) => {
  return {
    ...state,
    courses: action.payload,
    counter: action.payload.length,
    loading: ReqStatus.success
  };
};

const handleLoadStarted = (state: CoursesState) => {
  return {
    ...state,
    loading: ReqStatus.pending
  };
};

export function coursesReducer(state = initialState, action: CoursesActions): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LoadCoursesStarted:
    case CoursesActionTypes.CreateCourseStarted:
    case CoursesActionTypes.UpdateCourseStarted:
    case CoursesActionTypes.DeleteCourseStarted:
    case CoursesActionTypes.LoadCourseByIdStarted:
    case CoursesActionTypes.SearchCoursesStarted:
    case CoursesActionTypes.RestoreCoursesStarted:
      return handleLoadStarted(state);
    case CoursesActionTypes.LoadCoursesSucceed:
      return handleGetCourses(state, action);
    case CoursesActionTypes.CreateCourseSucceed:
      return handleSingleCourse(state, action);
    case CoursesActionTypes.UpdateCourseSucceed:
      return handleUpdateCourse(state, action);
    case CoursesActionTypes.DeleteCourseSucceed:
      return handleDeleteCourse(state, action);
    case CoursesActionTypes.LoadCourseByIdSucceed:
      return handleSingleCourse(state, action);
    case CoursesActionTypes.SearchCoursesSucceed:
      return handleSearchCourses(state, action);
    case CoursesActionTypes.RestoreCoursesSucceed:
      return handleRestoreCourses(state, action);
    default:
      return state;
  }
}
