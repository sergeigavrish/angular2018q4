import { Inject, Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { Course } from "./../models/interfaces/course.interface";
import { STORAGE_TOKEN } from "./../providers/storage.provider";
import { CoursesStorage } from "../models/interfaces/courses-storage.interface";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  constructor(
    @Inject(STORAGE_TOKEN) private storage: CoursesStorage
  ) { }

  getCourses(): Observable<Course[]> {
    return this.storage.getCourses();
  }

  loadCourses(): Observable<Course[] | boolean> {
    return this.storage.load() as Observable<Course[] | boolean>;
  }

  loadCourseById(id: string): Observable<Course> {
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
