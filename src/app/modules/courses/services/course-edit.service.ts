import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CoursesService } from "./courses.service";
import { Course } from "../models/interfaces/course.interface";

@Injectable({
  providedIn: "root"
})
export class CourseEditService {

  constructor(private coursesService: CoursesService) { }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.loadCourseById(id);
  }

  updateCourse(course: Course, id: string): Observable<boolean> {
    return this.coursesService.updateCourse(course, id);
  }

}
