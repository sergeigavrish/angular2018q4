import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Course } from "./../models/interfaces/course.interface";
import { Storage } from "../models/interfaces/strorage.interfase";
import { STORAGE_TOKEN } from "./../providers/storage.provider";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  constructor(
    @Inject(STORAGE_TOKEN) private storage: Storage<Course>
  ) { }

  getCourses(): Observable<Course[] | boolean> {
    return this.storage.load() as Observable<Course[] | boolean>;
  }

  getCourseById(id: string): Observable<Course> {
    return this.storage.load(id) as Observable<Course>;
  }

  createCourse(data: Course): Observable<boolean> {
    return this.storage.save(data);
  }

  updateCourse(course: Course, id: string): Observable<boolean> {
    return this.storage.update(course, id);
  }

  deleteCourse(id: string): Observable<boolean> {
    return this.storage.delete(id);
  }

}
