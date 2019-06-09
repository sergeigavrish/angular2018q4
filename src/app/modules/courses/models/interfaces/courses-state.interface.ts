import { ICourseEntity } from "./course-entity.interface";
import { ReqStatus } from "./../../../shared/types/index";
import { IndexedObject } from "../../../shared/models/interfaces/indexed-object.interface";

export interface CoursesState {
  courses: IndexedObject<ICourseEntity>;
  loading: ReqStatus;
  counter: number;
}
