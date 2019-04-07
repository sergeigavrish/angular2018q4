import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  BehaviorSubject,
  iif,
  Observable,
  of
} from "rxjs";
import { map, catchError, mergeMap } from "rxjs/operators";

import { Course } from "./../models/interfaces/course.interface";
import { courseFactory } from "./../factories/course.factory";
import { environment } from "../../../../environments/environment";
import { CoursesStorage } from "../models/interfaces/courses-storage.interface";

@Injectable()
export class CoursesRemoteStorageService implements CoursesStorage {

  private courses: BehaviorSubject<Array<Course>> = new BehaviorSubject<Array<Course>>([]);
  private count: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private limit = 10;

  constructor(private http: HttpClient) { }

  private handleCourses(data: Array<Course>) {
    return of(data).pipe(
      map(this.makeCourse),
      mergeMap(res => {
        this.courses.next(this.courses.getValue().concat(res));
        return this.courses.asObservable();
      })
    );
  }

  private handleCourse(data: Course) {
    return of(data).pipe(
      map(this.makeCourse),
    );
  }

  private makeCourse(data: Course | Array<Course>) {
    return Array.isArray(data) ? data.map(c => courseFactory(c)) : courseFactory(data);
  }

  private setupCourseReq(id: string) {
    if (id) {
      return this.http.get(`${environment.backendUrl}/courses/${id}`);
    }

    const start = `${this.count.getValue()}`;
    const count = `${this.limit}`;

    this.count.next(this.count.getValue() + this.limit);

    return this.http.get(`${environment.backendUrl}/courses`, { params: { start, count } });
  }

  private setupCourseRes(id: string) {
    return (data: Course | Array<Course>) => {
      return iif(
        () => !!id,
        this.handleCourse(data as Course),
        this.handleCourses(data as Array<Course>)
      );
    };
  }

  getCourses(): Observable<Array<Course>> {
    return this.courses.asObservable();
  }

  load(id?: string): Observable<Course[] | Course> {
    return this.setupCourseReq(id).pipe(
      mergeMap(this.setupCourseRes(id)),
      catchError(error => {
        console.warn(error.message);
        return of(null);
      })
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
