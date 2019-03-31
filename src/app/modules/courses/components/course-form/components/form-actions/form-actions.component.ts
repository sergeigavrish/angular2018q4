import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
  selector: "app-form-actions",
  templateUrl: "./form-actions.component.html",
  styleUrls: ["./form-actions.component.scss"],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormActionsComponent {

  @Input() isDisabled: boolean;

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  onCancel(): void {
    this.cancel.emit();
  }

}
