import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalDirective } from "./directives/modal.directive";
import { ModalComponent } from "./components";
import { IndexedObjectToArrayPipe } from "./pipes/indexed-object-to-array.pipe";
import { HighlightMatchingPipe } from "./pipes/highlight-matching.pipe";

@NgModule({
  declarations: [
    ModalDirective,
    ModalComponent,
    IndexedObjectToArrayPipe,
    HighlightMatchingPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ModalComponent, FormsModule, IndexedObjectToArrayPipe]
})
export class SharedModule { }
