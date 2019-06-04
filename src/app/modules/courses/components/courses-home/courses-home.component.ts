import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";

import { Course } from "../../models/interfaces/course.interface";
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

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void {
    this.store.dispatch(new LoadCoursesStarted);
    this.courses$ = this.store.pipe(select(selectCourses));
  }

  load(): void {
    return this.store.dispatch(new LoadCoursesStarted);
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
