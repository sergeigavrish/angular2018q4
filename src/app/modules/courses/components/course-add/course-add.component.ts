import { Component, OnInit } from "@angular/core";

import { first } from "rxjs/operators";

import { ModalService } from "./../../../shared/services/modal.service";
import { CoursesService } from "./../../services/courses.service";

@Component({
  selector: "app-course-add",
  templateUrl: "./course-add.component.html",
  styleUrls: ["./course-add.component.scss"]
})
export class CourseAddComponent implements OnInit {

  constructor(
    private coursesService: CoursesService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onSave(e) {
    this.coursesService.createCourse(e)
      .pipe(
        first(),
      )
      .subscribe(v => {
        if (v) {
          this.modalService.close();
        }
      });
  }

  onClose() {
    this.modalService.close();
  }

}
