import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalDirective } from "./directives/modal.directive";
import { SearchService } from "./../courses/services/search.service";
import { ModalComponent, SearchPanelComponent } from "./components";

@NgModule({
  declarations: [
    SearchPanelComponent,
    ModalDirective,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [SearchService],
  exports: [SearchPanelComponent, ModalComponent, FormsModule]
})
export class SharedModule { }
