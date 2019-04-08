import { CourseRequestParams } from "./../models/interfaces/CourseRequestParams.interface";
import { Injectable } from "@angular/core";

import {
  BehaviorSubject,
  iif,
  Observable,
  of
} from "rxjs";
import { map, tap } from "rxjs/operators";

import { Course } from "./../models/interfaces/course.interface";
import { courseFactory } from "./../factories/course.factory";
import { mockCoursesData } from "./../../../../data/mockCoursesData";
import { Storage } from "../models/interfaces/strorage.interfase";

@Injectable()
export class MockStorageService implements Storage<Course> {

  private courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(mockCoursesData);

  constructor() { }

  private loadCourses() {
    return this.courses.asObservable();
  }

  private loadCourseById(id: string) {
    return this.courses.asObservable().pipe(
      map(courses => courses.find(course => course.id === id))
    );
  }

  private handleLoad(opts: CourseRequestParams) {
    return iif(
      () => !!opts.id,
      this.loadCourseById(opts.id),
      this.loadCourses(),
    );
  }

  load<U>(opts: U): Observable<Course[] | Course> {
    return this.handleLoad(opts).pipe(
      tap(console.log)
    );
  }

  save(data: Course): Observable<boolean> {
    const length = this.courses.getValue().length;
    const newCourse = courseFactory({
      ...data,
      id: `${length + 1}`,
      image: "https://cdn.lynda.com/courses/375490-636814130086187859_270x480_thumb.jpg"
    });
    if (!newCourse.isCourse()) {
      return of(false);
    }
    const courses = this.courses.getValue();
    courses.push(newCourse);
    this.courses.next(courses);
    return of(true);
  }

  update(data: Course, id: string): Observable<boolean> {
    const newCourse = courseFactory(data);
    if (!newCourse.isCourse()) {
      return of(false);
    }
    const courses = this.courses.getValue();
    const courseId = courses.findIndex(el => el.id === id);
    if (courseId === -1) {
      return of(false);
    }
    this.courses.next([
      ...courses.slice(0, courseId),
      { ...newCourse },
      ...courses.slice(courseId + 1),
    ]);
    return of(true);
  }

  delete(id: string): Observable<boolean> {
    const courses = this.courses.getValue();
    const index = courses.findIndex(course => course.id === id);
    if (index === -1) {
      return of(false);
    }
    this.courses.next([
      ...courses.slice(0, index),
      ...courses.slice(index + 1),
    ]);
    return of(true);
  }

}
