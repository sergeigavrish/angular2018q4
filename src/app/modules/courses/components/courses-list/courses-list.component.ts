import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { Course } from "../../models/interfaces/course.interface";
import { ModalService } from "../../../shared/services/modal.service";
import { CourseDeleteComponent } from "../course-delete/course-delete.component";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {

  @Input() courses: Array<Course>;

  constructor(
    private router: Router,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
  }

  onDelete(course: Course): void {
    const { name, id } = course;
    this.modalService.init(CourseDeleteComponent, `Delete ${name}?`, { name, id });
  }

  onEdit(course: Course) {
    this.router.navigate(["courses", course.id]);
  }

}
