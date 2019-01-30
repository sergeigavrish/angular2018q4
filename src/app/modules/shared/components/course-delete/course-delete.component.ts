import { Component, OnInit } from "@angular/core";

import { CourseDeleteService } from "./../../../courses/services/course-delete.service";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.scss"]
})
export class CourseDeleteComponent implements OnInit {

  constructor(
    private courseDeleteService: CourseDeleteService,
  ) { }

  ngOnInit() {
  }

  onClick(value: boolean): void {
    this.courseDeleteService.setIsConfirmed(value);
  }

}
