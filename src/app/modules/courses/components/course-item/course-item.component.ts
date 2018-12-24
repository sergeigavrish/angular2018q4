import { Component, OnInit, Input } from "@angular/core";
import { Course } from "../../models/interfaces/course.interface";

@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"]
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
