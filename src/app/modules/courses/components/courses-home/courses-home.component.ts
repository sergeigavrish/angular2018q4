import { Store, select } from "@ngrx/store";
import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, of, iif } from "rxjs";
import { switchMap, tap, first } from "rxjs/operators";

import { CoursesService } from "./../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { SearchService } from "../../../core/services/search.service";
import { SearchStatus } from "../../../core/types";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { selectCourses } from "../../store/courses.selectors";
import { LoadCourses } from "../../store/courses.actions";
import { CourseEntity } from "./../../models/entity/course.entity";
import { COUNT_TOKEN } from "../../providers/count.provider";

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
    private coursesService: CoursesService,
    private searchService: SearchService,
    private store: Store<AppState>,
    @Inject(COUNT_TOKEN) private count: number
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
      switchMap(courses => iif(
        () => { console.log("LOOOH", courses); return !!courses.length; },
        of(courses),
        this.coursesService.loadCourses().pipe(
          tap(this.dispatchArrayOfCourse),
          select(selectCourses)
        )
      ))
    );
  }

  getSearchStatus() {
    return this.searchService.getSearchStatus() === SearchStatus.success;
  }

  load(): void {
    this.courses$
      .pipe(
        first(),
        switchMap(courses => {
          const start = this.count * +(courses.length / this.count).toFixed();
          return this.coursesService.loadCourses(start)
            .pipe(
              tap(res => console.log("loaded", res))
            );
        })
      )
      .subscribe(this.dispatchArrayOfCourse);
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

  private dispatchArrayOfCourse = (res: Array<any>): void => {
    if (CourseEntity.isArrayOfCourse(res)) {
      this.store.dispatch(new LoadCourses(res));
    }
  }

}
