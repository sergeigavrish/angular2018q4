import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Course } from "../../../../models/interfaces/course.interface";

@Component({
  selector: "app-form-duration",
  templateUrl: "./form-duration.component.html",
  styleUrls: ["./form-duration.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormDurationComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
