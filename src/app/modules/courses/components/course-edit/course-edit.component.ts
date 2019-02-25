import { Component, Input, OnInit } from "@angular/core";

import { Course } from "./../../../courses/models/interfaces/course.interface";
import { CourseEditService } from "./../../../courses/services/course-edit.service";
import { ModalService } from "./../../../shared/services/modal.service";

@Component({
  selector: "app-course-edit",
  templateUrl: "./course-edit.component.html",
  styleUrls: ["./course-edit.component.scss"]
})
export class CourseEditComponent implements OnInit {

  @Input() id: string;

  course: Course;

  constructor(
    private courseEditService: CourseEditService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.courseEditService.getCourse(this.id)
      .subscribe(course => this.course = { ...course });
  }

  onSave() {
    this.courseEditService.updateCourse(this.course, this.id);
    this.modalService.close();
  }

  onCancel() {
    this.modalService.close();
  }

}
