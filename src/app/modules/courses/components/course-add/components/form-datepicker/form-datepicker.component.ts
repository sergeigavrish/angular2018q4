import { Component, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: "app-form-datepicker",
  templateUrl: "./form-datepicker.component.html",
  styleUrls: ["./form-datepicker.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormDatepickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
