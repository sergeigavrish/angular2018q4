import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { debounceTime, switchMap, distinctUntilChanged, filter, tap, map } from "rxjs/operators";

import { CoursesService } from "../../courses/services/courses.service";
import { Course } from "../../courses/models/interfaces/course.interface";
import { SearchStatus } from "../types";

@Injectable()
export class SearchService {

  private searchValue$: BehaviorSubject<string> = new BehaviorSubject("");
  private foundCourses$: BehaviorSubject<Array<Course>> = new BehaviorSubject([]);
  private searchStatus$: BehaviorSubject<SearchStatus> = new BehaviorSubject(SearchStatus.empty);

  constructor(
    private coursesService: CoursesService,
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

  getFoundCourses(): Observable<Array<Course>> {
    return this.foundCourses$.asObservable();
  }

  getSearchStatus(): SearchStatus {
    return this.searchStatus$.getValue();
  }

  private search() {
    this.searchValue$.asObservable()
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map(value => value.trim().toLowerCase()),
        filter(() => this.searchValue$.getValue().length >= 3),
        tap(() => this.searchStatus$.next(SearchStatus.pending)),
        switchMap(() => this.coursesService.searchCourses(this.searchValue$.getValue())),
      )
      .subscribe(this.setFoundCourses);
  }

  private setFoundCourses = (courses: Array<Course>): void => {
    this.foundCourses$.next(courses);
    this.searchStatus$.next(SearchStatus.success);
  }

}
