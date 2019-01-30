import { CourseDeleteComponent } from "./components/course-delete/course-delete.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ModalComponent } from "./components/modal/modal.component";
import { ModalDirective } from "./directives/modal.directive";
import { SearchPanelComponent } from "./components/search-panel/search-panel.component";
import { SearchService } from "./../courses/services/search.service";

@NgModule({
  declarations: [
    SearchPanelComponent,
    ModalDirective,
    ModalComponent,
    CourseDeleteComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [SearchService],
  entryComponents: [ModalComponent, CourseDeleteComponent],
  exports: [SearchPanelComponent]
})
export class SharedModule { }
