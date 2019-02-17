import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Course } from "../../models/interfaces/course.interface";
import { FilterPipe } from "./../../pipes/filter.pipe";
import { SearchService } from "./../../services/search.service";
import { Unsubscribable } from "./../../../shared/models/entity/unsubscribable.entity";
import { ModalService } from "../../../shared/services/modal.service";
import { CoursesService } from "./../../services/courses.service";
import { CourseDeleteComponent } from "../course-delete/course-delete.component";
import { CourseEditComponent } from "../course-edit/course-edit.component";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  providers: [FilterPipe]
})
export class CoursesListComponent extends Unsubscribable implements OnInit {

  courses$: Observable<Course[]>;

  constructor(
    private searchService: SearchService,
    private filterPipe: FilterPipe,
    private coursesService: CoursesService,
    private modalService: ModalService,
  ) { super(); }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses() as Observable<Course[]>;
    this.searchService.getSearchValue$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value: string) =>
        this.courses$ = this.filterPipe.transform(this.coursesService.getCourses() as Observable<Course[]>, value));
  }

  onDelete(course: Course): void {
    const { title, id } = course;
    this.modalService.init(CourseDeleteComponent, `Delete ${course.title}?`, { title, id });
  }

  onEdit(course: Course) {
    this.modalService.init(CourseEditComponent, `Edit ${course.title}`, { id: course.id });
  }

}
