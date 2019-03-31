import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Course } from "../../../../models/interfaces/course.interface";

@Component({
  selector: "app-form-datepicker",
  templateUrl: "./form-datepicker.component.html",
  styleUrls: ["./form-datepicker.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormDatepickerComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
