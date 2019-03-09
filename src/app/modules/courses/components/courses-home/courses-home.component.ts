import { ModalService } from "./../../../shared/services/modal.service";
import { Component, OnInit } from "@angular/core";
import { CourseAddComponent } from "../course-add/course-add.component";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() {
  }

  loadMore(): void {
    console.log("loadMore");
  }

  onAdd() {
    this.modalService.init(CourseAddComponent, "Create new course");
  }

}
