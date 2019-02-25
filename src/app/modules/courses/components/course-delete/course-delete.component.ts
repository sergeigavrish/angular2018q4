import { Component, OnInit, Input } from "@angular/core";

import { CourseDeleteService } from "./../../../courses/services/course-delete.service";
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
    private courseDeleteService: CourseDeleteService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  onCancel(): void {
    this.modalService.close();
  }

  onConfirm() {
    this.courseDeleteService.delete(this.id);
    this.modalService.close();
  }

}
