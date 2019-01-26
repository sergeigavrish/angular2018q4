import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SearchPanelComponent } from "./components/search-panel/search-panel.component";
import { SearchService } from "./../courses/services/search.service";

@NgModule({
  declarations: [
    SearchPanelComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [SearchService],
  exports: [SearchPanelComponent]
})
export class SharedModule { }
