import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from "@angular/core";

import { Course } from "../../models/interfaces/course.interface";

@Component({
  selector: "app-course-item",
  templateUrl: "./course-item.component.html",
  styleUrls: ["./course-item.component.scss"]
})
export class CourseItemComponent implements OnInit {

  @Input() course: Course;

  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();

  constructor() { }

  ngOnInit() {
  }

  onDeleteClick(): void {
    this.delete.emit(this.course);
  }

  onDeleteEdit(): void {
    this.edit.emit(this.course);
  }

}
