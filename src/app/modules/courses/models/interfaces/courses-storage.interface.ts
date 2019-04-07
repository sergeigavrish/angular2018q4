import { Storage } from "./strorage.interfase";
import { Course } from "./course.interface";
import { Observable } from "rxjs";

export interface CoursesStorage extends Storage<Course> {
  getCourses(): Observable<Array<Course>>;
}
