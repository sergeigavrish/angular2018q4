import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Course } from "./../models/interfaces/course.interface";
import { ICourseEntity } from "../models/interfaces/course-entity.interface";
import { STORAGE_TOKEN } from "./../providers/storage.provider";
import { Storage } from "../models/interfaces/strorage.interface";
import { CourseRequestParams } from "../models/interfaces/course-request-params.interface";
import { COUNT_TOKEN } from "./../providers/count.provider";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  constructor(
    @Inject(STORAGE_TOKEN) private storage: Storage<ICourseEntity>,
    @Inject(COUNT_TOKEN) private count: number
  ) { }

  searchCourses(textFragment: string): Observable<Array<ICourseEntity>> {
    return this.storage.load<CourseRequestParams>({ textFragment }) as Observable<Array<ICourseEntity>>;
  }

  loadCourses(start = 0, counter?: number): Observable<ICourseEntity[]> {
    return this.storage.load<CourseRequestParams>({ start, count: counter ? counter : this.count }) as Observable<ICourseEntity[]>;
  }

  loadCourseById(id: string): Observable<Course> {
    return this.storage.load<CourseRequestParams>({ id }) as Observable<Course>;
  }

  createCourse(data: Course): Observable<Course | boolean> {
    return this.storage.save<Course>(data);
  }

  updateCourse(course: ICourseEntity, id: string): Observable<ICourseEntity | boolean> {
    return this.storage.update(course, id);
  }

  deleteCourse(id: string): Observable<string | boolean> {
    return this.storage.delete(id);
  }

}
