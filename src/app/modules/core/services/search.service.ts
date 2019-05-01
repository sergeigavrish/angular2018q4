import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, of } from "rxjs";
import { switchMap, filter, tap, map } from "rxjs/operators";

import { CoursesService } from "../../courses/services/courses.service";
import { Course } from "../../courses/models/interfaces/course.interface";
import { SearchStatus } from "../types";

@Injectable()
export class SearchService {

  private foundCourses$: BehaviorSubject<Array<Course>> = new BehaviorSubject([]);
  private searchStatus$: BehaviorSubject<SearchStatus> = new BehaviorSubject(SearchStatus.empty);

  constructor(
    private coursesService: CoursesService,
  ) { }

  getFoundCourses(): Observable<Array<Course>> {
    return this.foundCourses$.asObservable();
  }

  getSearchStatus(): SearchStatus {
    return this.searchStatus$.getValue();
  }

  search = (value: string): Observable<Array<Course>> => {
    return of(value)
      .pipe(
        map(v => v.trim().toLowerCase()),
        filter(v => v.length >= 3),
        tap(() => this.searchStatus$.next(SearchStatus.pending)),
        switchMap(v => this.coursesService.searchCourses(v)),
      );
  }

  setFoundCourses = (courses: Array<Course>): void => {
    this.foundCourses$.next(courses);
    if (courses.length) {
      this.searchStatus$.next(SearchStatus.success);
    } else {
      this.searchStatus$.next(SearchStatus.empty);
    }
  }

}
