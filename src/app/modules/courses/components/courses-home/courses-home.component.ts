import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs";

import { CoursesService } from "./../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { SearchService } from "../../services/search.service";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  courses$: Observable<Array<Course>>;
  search$: Observable<string>;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private searchService: SearchService,
  ) { }

  ngOnInit() {
    this.load();
    this.search();
  }

  private search() {
    this.search$ = this.searchService.getSearchValue$();
  }

  load(): void {
    this.courses$ = this.coursesService.loadCourses() as Observable<Array<Course>>;
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
