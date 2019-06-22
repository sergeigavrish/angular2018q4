import { Component } from "@angular/core";
import { FormControl, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { valueAccessorProviderFactory } from "../../../../factories/value-accessor-provider.factory";
import { validatorsProviderFactory } from "../../../../factories/validators-provider.factory";

@Component({
  selector: "app-form-datepicker",
  templateUrl: "./form-datepicker.component.html",
  styleUrls: ["./form-datepicker.component.scss"],
  providers: [
    valueAccessorProviderFactory<FormDatepickerComponent>(FormDatepickerComponent),
    validatorsProviderFactory<FormDatepickerComponent>(FormDatepickerComponent)
  ]
})
export class FormDatepickerComponent {

  control: FormControl = new FormControl("", [Validators.required]);

  constructor() { }

  onChange = (_) => { };
  onTouched = () => { };

  writeValue(v) {
    this.control.setValue(v);
  }

  registerOnChange(fn: any) {
    this.control.valueChanges.subscribe((date) => fn(new Date(date)));
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return c.valid ? null : { required: 42 };
  }

}
