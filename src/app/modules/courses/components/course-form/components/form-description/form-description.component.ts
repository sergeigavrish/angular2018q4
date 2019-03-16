import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Course } from "../../../../models/interfaces/course.interface";

@Component({
  selector: "app-form-description",
  templateUrl: "./form-description.component.html",
  styleUrls: ["./form-description.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormDescriptionComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
