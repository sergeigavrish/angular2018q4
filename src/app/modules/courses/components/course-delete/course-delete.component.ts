import { Component, OnInit, Input } from "@angular/core";

import { CoursesService } from "./../../services/courses.service";
import { ModalService } from "../../../shared/services/modal.service";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.scss"]
})
export class CourseDeleteComponent implements OnInit {

  @Input() title: string;
  @Input() id: string;

  constructor(
    private courseService: CoursesService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.modalService.close();
  }

  onConfirm() {
    this.courseService.deleteCourse(this.id)
      .subscribe(c => {
        this.modalService.close();
      });
  }

}
