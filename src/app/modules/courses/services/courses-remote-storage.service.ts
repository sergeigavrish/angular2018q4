import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  Observable,
  of,
} from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { Course } from "./../models/interfaces/course.interface";
import { courseFactory } from "./../factories/course.factory";
import { environment } from "../../../../environments/environment";
import { Storage } from "../models/interfaces/strorage.interfase";
import { CourseRequestParams } from "../models/interfaces/CourseRequestParams.interface";

@Injectable()
export class CoursesRemoteStorageService implements Storage<Course> {

  constructor(private http: HttpClient) { }

  private handleCourses(data: Course | Array<Course>) {
    return of(data).pipe(
      map(this.makeCourse)
    );
  }

  private makeCourse(data: Course | Array<Course>) {
    return Array.isArray(data) ? data.map(c => courseFactory(c)) : courseFactory(data);
  }

  private setupCourseReq(opts: CourseRequestParams) {
    if (opts.id) {
      return this.http.get(`${environment.backendUrl}/courses/${opts.id}`);
    }

    return this.http.get(`${environment.backendUrl}/courses`, { params: opts as { [param: string]: string } });
  }

  private setupCourseRes() {
    return (data: Course | Array<Course>) => this.handleCourses(data);
  }

  load<U>(opts: U): Observable<Course | Course[]> {
    return this.setupCourseReq(opts).pipe(
      mergeMap(this.setupCourseRes()),
      catchError(error => {
        console.warn(error.message);
        return of(null);
      })
    );
  }

  save(data: Course): Observable<boolean> {
    // const length = this.courses.getValue().length;
    // const newCourse = courseFactory({
    //   ...data,
    //   id: `${length + 1}`,
    //   image: "https://cdn.lynda.com/courses/375490-636814130086187859_270x480_thumb.jpg"
    // });
    // if (!newCourse.isCourse()) {
    //   return of(false);
    // }
    // const courses = this.courses.getValue();
    // courses.push(newCourse);
    // this.courses.next(courses);
    return of(true);
  }

  update(data: Course, id: string): Observable<boolean> {
    // const newCourse = courseFactory(data);
    // if (!newCourse.isCourse()) {
    //   return of(false);
    // }
    // const courses = this.courses.getValue();
    // const courseId = courses.findIndex(el => el.id === id);
    // if (courseId === -1) {
    //   return of(false);
    // }
    // this.courses.next([
    //   ...courses.slice(0, courseId),
    //   { ...newCourse },
    //   ...courses.slice(courseId + 1),
    // ]);
    return of(true);
  }

  delete(id: string): Observable<boolean> {
    // const courses = this.courses.getValue();
    // const index = courses.findIndex(course => course.id === id);
    // if (index === -1) {
    //   return of(false);
    // }
    // this.courses.next([
    //   ...courses.slice(0, index),
    //   ...courses.slice(index + 1),
    // ]);
    return of(true);
  }

}
