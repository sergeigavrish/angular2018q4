import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  Observable,
  of,
  pipe
} from "rxjs";
import { map, catchError, mergeMap, switchMap } from "rxjs/operators";

import { courseFactory } from "./../factories/course.factory";
import { environment } from "../../../../environments/environment";
import { Storage } from "../models/interfaces/strorage.interface";
import { CourseRequestParams } from "../models/interfaces/course-request-params.interface";
import { CourseEntity } from "../models/entity/course.entity";
import { ICourseEntity } from "../models/interfaces/course-entity.interface";

@Injectable()
export class CoursesRemoteStorageService implements Storage<ICourseEntity> {

  constructor(private http: HttpClient) { }

  private handleCourses(data: ICourseEntity | Array<ICourseEntity>) {
    return of(data).pipe(
      map(this.makeCourse)
    );
  }

  private makeCourse(data: ICourseEntity | Array<ICourseEntity>) {
    return Array.isArray(data) ? data.map(c => courseFactory(c)) : courseFactory(data);
  }

  private setupCourseReq(opts: CourseRequestParams) {
    if (!opts) {
      return this.http.get(`${environment.backendUrl}/courses`);
    }
    if (opts.id) {
      return this.http.get(`${environment.backendUrl}/courses/${opts.id}`);
    }
    return this.http.get(`${environment.backendUrl}/courses`, { params: opts as { [param: string]: string } });
  }

  private setupCourseRes() {
    return (data: ICourseEntity | Array<ICourseEntity>) => this.handleCourses(data);
  }

  private saveAndUpdatePipe() {
    return pipe(
      switchMap(res => this.handleCourses(res as ICourseEntity) as Observable<ICourseEntity>),
      catchError(error => {
        console.warn(error.message);
        return of(false);
      })
    );
  }

  loadReq<U>(opts?: U): Observable<ICourseEntity | ICourseEntity[]> {
    return this.setupCourseReq(opts).pipe(
      mergeMap(this.setupCourseRes()),
      catchError(error => {
        console.warn(error.message);
        return of(null);
      })
    );
  }

  saveReq<T extends object>(data: T): Observable<ICourseEntity | boolean> {
    const course = {
      ...data as object,
      image: "https://cdn.lynda.com/courses/375490-636814130086187859_270x480_thumb.jpg"
    };
    if (!CourseEntity.isCourse(course)) {
      return of(false);
    }
    return this.http.post<ICourseEntity>(`${environment.backendUrl}/courses`, course).pipe(this.saveAndUpdatePipe());
  }

  updateReq(data: ICourseEntity, id: string): Observable<ICourseEntity | boolean> {
    if (!CourseEntity.isCourse(data)) {
      return of(false);
    }
    return this.http.put<ICourseEntity>(`${environment.backendUrl}/courses/${id}`, data).pipe(this.saveAndUpdatePipe());
  }

  deleteReq(id: string): Observable<string | boolean> {
    return this.http.delete(`${environment.backendUrl}/courses/${id}`).pipe(
      map(() => id),
      catchError(error => {
        console.warn(error.message);
        return of(false);
      })
    );
  }

}
