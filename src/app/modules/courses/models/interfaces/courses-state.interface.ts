import { Course } from "./course.interface";
import { ReqStatus } from "./../../../shared/types/index";

export interface CoursesState {
  courses: Array<Course>;
  loading: ReqStatus;
  counter: number;
}
