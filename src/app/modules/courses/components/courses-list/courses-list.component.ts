import { CourseDeleteService } from "./../../services/course-delete.service";
import { first, takeUntil } from "rxjs/operators";
import { ModalComponent } from "./../../../shared/components/modal/modal.component";
import { CourseDeleteComponent } from "./../../../shared/components/course-delete/course-delete.component";
import { CoursesService } from "./../../services/courses.service";
import { Component, OnInit, ElementRef } from "@angular/core";

import { Observable } from "rxjs";

import { Course } from "../../models/interfaces/course.interface";
import { FilterPipe } from "./../../pipes/filter.pipe";
import { SearchService } from "./../../services/search.service";
import { Unsubscribable } from "./../../../shared/models/entity/unsubscribable.entity";
import { ModalService } from "../../../shared/services/modal.service";

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
    private courseDeleteService: CourseDeleteService,
    private el: ElementRef
  ) { super(); }

  ngOnInit() {
    this.courses$ = this.coursesService.getCourses() as Observable<Course[]>;
    this.searchService.getSearchValue$()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((value: string) =>
        this.courses$ = this.filterPipe.transform(this.coursesService.getCourses() as Observable<Course[]>, value));
  }

  onDelete(course: Course): void {
    this.modalService.open(ModalComponent, CourseDeleteComponent, this.el.nativeElement);
    this.courseDeleteService.getIsConfirmed()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        first()
      )
      .subscribe(isConfirmed => {
        if (isConfirmed) {
          this.coursesService.deleteCourse(course.id);
        }
        this.modalService.close();
      });
  }

}
