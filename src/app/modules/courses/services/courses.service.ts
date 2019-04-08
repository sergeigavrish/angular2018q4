import { map } from "rxjs/operators";
import { Inject, Injectable } from "@angular/core";

import { Observable, BehaviorSubject } from "rxjs";

import { Course } from "./../models/interfaces/course.interface";
import { STORAGE_TOKEN } from "./../providers/storage.provider";
import { Storage } from "../models/interfaces/strorage.interfase";
import { CourseRequestParams } from "../models/interfaces/CourseRequestParams.interface";

@Injectable({
  providedIn: "root"
})
export class CoursesService {

  private courses$: BehaviorSubject<Array<Course>> = new BehaviorSubject<Array<Course>>([]);
  private start = 0;
  private count = 6;

  constructor(
    @Inject(STORAGE_TOKEN) private storage: Storage<Course>
  ) { }

  getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  searchCourses(textFragment: string): Observable<Array<Course>> {
    return this.storage.load<CourseRequestParams>({ textFragment }) as Observable<Array<Course>>;
  }

  loadCourses(): Observable<Course[]> {
    const { start, count } = this;
    return this.storage.load<CourseRequestParams>({ start, count }).pipe(
      map((res: Array<Course>) => {
        if (Array.isArray(res)) {
          this.courses$.next(this.courses$.getValue().concat(res as Array<Course>));
          this.start += this.count;
        }
        return this.courses$.getValue();
      })
    );
  }

  loadCourseById(id: string): Observable<Course> {
    return this.storage.load<CourseRequestParams>({ id }) as Observable<Course>;
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
