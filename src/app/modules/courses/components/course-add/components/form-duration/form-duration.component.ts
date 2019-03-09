import { Component, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: "app-form-duration",
  templateUrl: "./form-duration.component.html",
  styleUrls: ["./form-duration.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormDurationComponent implements OnInit {

  duration: number;

  constructor() { }

  ngOnInit() {
  }

}
