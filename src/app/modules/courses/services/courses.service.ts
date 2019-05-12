import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Course } from "./../models/interfaces/course.interface";
import { STORAGE_TOKEN } from "./../providers/storage.provider";
import { Storage } from "../models/interfaces/strorage.interface";
import { CourseRequestParams } from "../models/interfaces/course-request-params.interface";
import { COUNT_TOKEN } from "./../providers/count.provider";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  constructor(
    @Inject(STORAGE_TOKEN) private storage: Storage<Course>,
    @Inject(COUNT_TOKEN) private count: number
  ) { }

  searchCourses(textFragment: string): Observable<Array<Course>> {
    return this.storage.load<CourseRequestParams>({ textFragment }) as Observable<Array<Course>>;
  }

  loadCourses(start = 0): Observable<Course[]> {
    return this.storage.load<CourseRequestParams>({ start, count: this.count }) as Observable<Course[]>;
  }

  loadCourseById(id: string): Observable<Course> {
    return this.storage.load<CourseRequestParams>({ id }) as Observable<Course>;
  }

  createCourse(data: Course): Observable<Course | boolean> {
    return this.storage.save(data);
  }

  updateCourse(course: Course, id: string): Observable<Course | boolean> {
    return this.storage.update(course, id);
  }

  deleteCourse(id: string): Observable<string | boolean> {
    return this.storage.delete(id);
  }

}
