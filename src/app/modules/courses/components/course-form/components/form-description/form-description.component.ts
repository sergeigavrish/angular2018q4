import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-form-description",
  templateUrl: "./form-description.component.html",
  styleUrls: ["./form-description.component.scss"],
})
export class FormDescriptionComponent {

  @Input() control: FormControl;

  constructor() { }

}
