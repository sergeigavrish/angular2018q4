import { Inject, Injectable } from "@angular/core";

import { Observable, BehaviorSubject, of } from "rxjs";
import { map } from "rxjs/operators";

import { Course } from "./../models/interfaces/course.interface";
import { STORAGE_TOKEN } from "./../providers/storage.provider";
import { Storage } from "../models/interfaces/strorage.interfase";
import { CourseRequestParams } from "../models/interfaces/CourseRequestParams.interface";
import { CourseEntity } from "./../models/entity/course.entity";
import { courseFactory } from "../factories/course.factory";

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

  createCourse(data: Course): Observable<Course | boolean> {
    return this.storage.save(data);
  }

  updateCourse(course: Course, id: string): Observable<Course | boolean> {
    return this.storage.update(course, id).pipe(
      map((res: Course | boolean) => {
        if (CourseEntity.isCourse(res as Course)) {
          const courses = this.courses$.getValue();
          const index = courses.findIndex(c => c.id === (<Course>res).id);
          const newCourse = courseFactory(res as Course);
          const oldCourse = courses[index];
          this.courses$.next([
            ...courses.slice(0, index),
            newCourse,
            ...courses.slice(index + 1),
          ]);
          return oldCourse;
        }
        return false;
      })
    );
  }

  deleteCourse(id: string): Observable<any> {
    return this.storage.delete(id).pipe(
      map((res: string | boolean) => {
        if (!res) {
          return res;
        }
        const courses = this.courses$.getValue();
        const index = courses.findIndex(c => c.id === res);
        const course = courses[index];
        this.courses$.next([
          ...courses.slice(0, index),
          ...courses.slice(index + 1),
        ]);
        return course;
      })
    );
  }

}
