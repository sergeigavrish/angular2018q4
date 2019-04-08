import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, of, iif } from "rxjs";

import { CoursesService } from "./../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { SearchService } from "../../services/search.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  courses$: Observable<Array<Course>>;
  filteredCourses$: Observable<Array<Course>>;
  searchValue$: Observable<string>;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.init();
    this.search();
  }

  private search() {
    this.searchValue$ = this.searchService.getSearchValue();
    this.filteredCourses$ = this.searchService.getSearchValue().pipe(
      switchMap(v => {
        if (v) {
          return this.coursesService.searchCourses(v);
        }
        return of([]);
      })
    );
  }

  private init(): void {
    this.courses$ = this.coursesService.getCourses().pipe(
      switchMap(data => {
        return iif(
          () => !!data.length,
          of(data),
          this.coursesService.loadCourses()
        );
      })
    );

  }

  load(): void {
    this.coursesService.loadCourses()
      .subscribe(() => console.log("loaded"));
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
