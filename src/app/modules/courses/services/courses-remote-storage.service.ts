import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  Observable,
  of,
  pipe
} from "rxjs";
import { map, catchError, mergeMap, switchMap } from "rxjs/operators";

import { Course } from "./../models/interfaces/course.interface";
import { courseFactory } from "./../factories/course.factory";
import { environment } from "../../../../environments/environment";
import { Storage } from "../models/interfaces/strorage.interfase";
import { CourseRequestParams } from "../models/interfaces/CourseRequestParams.interface";
import { CourseEntity } from "../models/entity/course.entity";

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

  private saveAndUpdatePipe() {
    return pipe(
      switchMap(res => this.handleCourses(res as Course) as Observable<Course>),
      catchError(error => {
        console.warn(error.message);
        return of(false);
      })
    );
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

  save(data: Course): Observable<Course | boolean> {
    const course = courseFactory({
      ...data,
      image: "https://cdn.lynda.com/courses/375490-636814130086187859_270x480_thumb.jpg"
    });
    if (!CourseEntity.isCourse(course)) {
      return of(false);
    }
    return this.http.post<Course>(`${environment.backendUrl}/courses`, course).pipe(this.saveAndUpdatePipe());
  }

  update(data: Course, id: string): Observable<Course | boolean> {
    if (!CourseEntity.isCourse(data)) {
      return of(false);
    }
    return this.http.put<Course>(`${environment.backendUrl}/courses/${id}`, data).pipe(this.saveAndUpdatePipe());
  }

  delete(id: string): Observable<string | boolean> {
    return this.http.delete(`${environment.backendUrl}/courses/${id}`).pipe(
      map(() => id),
      catchError(error => {
        console.warn(error.message);
        return of(false);
      })
    );
  }

}
