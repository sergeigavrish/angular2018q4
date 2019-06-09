import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { selectCourses } from "../../store/courses.selectors";
import { LoadCoursesStarted } from "../../store/courses.actions";
import { ICourseEntity } from "../../models/interfaces/course-entity.interface";
import { indexedObjectToArray } from "./../../../shared/helpers/index";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  courses$: Observable<Array<ICourseEntity>>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(): void {
    this.store.dispatch(new LoadCoursesStarted);
    this.courses$ = this.store.pipe(
      select(selectCourses),
      map(c => indexedObjectToArray<ICourseEntity>(c))
    );
  }

  load(): void {
    return this.store.dispatch(new LoadCoursesStarted);
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
