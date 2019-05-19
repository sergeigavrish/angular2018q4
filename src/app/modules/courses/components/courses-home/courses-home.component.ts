import { Store, select } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Course } from "../../models/interfaces/course.interface";
import { SearchService } from "../../../core/services/search.service";
import { SearchStatus } from "../../../core/types";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { selectCourses } from "../../store/courses.selectors";
import { LoadCoursesStarted } from "../../store/courses.actions";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  courses$: Observable<Array<Course>>;
  filteredCourses$: Observable<Array<Course>>;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.init();
    this.search();
  }

  private search() {
    this.filteredCourses$ = this.searchService.getFoundCourses();
  }

  private init(): void {
    this.courses$ = this.store.pipe(
      select(selectCourses),
      switchMap(courses => {
        if (courses.length) {
          return of(courses);
        }
        this.store.dispatch(new LoadCoursesStarted);
        return of([]);
      })
    );
  }

  getSearchStatus() {
    return this.searchService.getSearchStatus() === SearchStatus.success;
  }

  load(): void {
    return this.store.dispatch(new LoadCoursesStarted);
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
