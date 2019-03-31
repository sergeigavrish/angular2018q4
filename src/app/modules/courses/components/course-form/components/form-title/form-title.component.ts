import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { Course } from "../../../../models/interfaces/course.interface";

@Component({
  selector: "app-form-title",
  templateUrl: "./form-title.component.html",
  styleUrls: ["./form-title.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormTitleComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit() {
  }

}
