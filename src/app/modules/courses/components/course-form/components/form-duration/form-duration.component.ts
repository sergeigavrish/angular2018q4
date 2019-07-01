import { Component } from "@angular/core";
import { FormControl, Validators, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from "@angular/forms";

import { valueAccessorProviderFactory } from "../../../../factories/value-accessor-provider.factory";
import { validatorsProviderFactory } from "../../../../factories/validators-provider.factory";

@Component({
  selector: "app-form-duration",
  templateUrl: "./form-duration.component.html",
  styleUrls: ["./form-duration.component.scss"],
  providers: [
    valueAccessorProviderFactory<FormDurationComponent>(FormDurationComponent),
    validatorsProviderFactory<FormDurationComponent>(FormDurationComponent)
  ]
})
export class FormDurationComponent implements ControlValueAccessor, Validator {

  control: FormControl = new FormControl("", [Validators.required]);

  constructor() { }

  onChange = (_) => { };
  onTouched = () => { };

  writeValue(v) {
    this.onChange(v);
    this.control.setValue(v);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
    this.control.valueChanges.subscribe((date) => date > 0 ? fn(date) : null);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return c.valid ? null : { required: 42 };
  }

}
