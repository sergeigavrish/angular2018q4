import { Component, OnInit, Input } from "@angular/core";

import { takeUntil } from "rxjs/operators";

import { CoursesService } from "./../../services/courses.service";
import { ModalService } from "../../../shared/services/modal.service";
import { Unsubscribable } from "./../../../shared/models/entity/unsubscribable.entity";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.scss"]
})
export class CourseDeleteComponent extends Unsubscribable implements OnInit {

  @Input() title: string;
  @Input() id: string;

  constructor(
    private courseService: CoursesService,
    private modalService: ModalService
  ) { super(); }

  ngOnInit() {
  }

  onCancel(): void {
    this.modalService.close();
  }

  onConfirm() {
    this.courseService.deleteCourse(this.id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(c => {
        this.modalService.close();
      });
  }

}
