import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalDirective } from "./directives/modal.directive";
import { ModalComponent } from "./components";

@NgModule({
  declarations: [
    ModalDirective,
    ModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ModalComponent, FormsModule]
})
export class SharedModule { }
