import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, switchMap, distinctUntilChanged, filter, tap, map } from "rxjs/operators";

import { CoursesService } from "./courses.service";
import { Course } from "../models/interfaces/course.interface";

@Injectable()
export class SearchService {

  private searchValue$: BehaviorSubject<string> = new BehaviorSubject("");
  private foundCourses$: BehaviorSubject<Array<Course>> = new BehaviorSubject([]);

  constructor(
    private coursesService: CoursesService
  ) { }

  getSearchValue(): Observable<string> {
    return this.searchValue$.asObservable();
  }

  setSearchValue(value?: string): void {
    if (typeof value === "string") {
      this.searchValue$.next(value);
    }
    this.search();
  }

  private search() {
    this.searchValue$.asObservable()
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(value => value.trim().toLowerCase()),
        filter(() => this.searchValue$.getValue().length >= 3),
        tap(() => console.log()),
        switchMap(() => this.coursesService.searchCourses(this.searchValue$.getValue())),
      )
      .subscribe(this.setFoundCourses);
  }

  private setFoundCourses = (courses: Array<Course>): void => this.foundCourses$.next(courses);

  getFoundCourses(): Observable<Array<Course>> {
    return this.foundCourses$.asObservable();
  }

}
