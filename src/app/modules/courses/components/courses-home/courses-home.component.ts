import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable, of, iif } from "rxjs";
import { switchMap } from "rxjs/operators";

import { CoursesService } from "./../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { SearchService } from "../../../core/services/search.service";
import { SearchStatus } from "../../../core/types";

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
  ) { }

  ngOnInit() {
    this.init();
    this.search();
  }

  private search() {
    this.filteredCourses$ = this.searchService.getFoundCourses();
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

  getSearchStatus() {
    return this.searchService.getSearchStatus() === SearchStatus.success;
  }

  load(): void {
    this.coursesService.loadCourses()
      .subscribe(() => console.log("loaded"));
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
