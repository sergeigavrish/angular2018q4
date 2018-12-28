import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPanelComponent } from "./components/search-panel/search-panel.component";

@NgModule({
  declarations: [
    SearchPanelComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [SearchPanelComponent]
})
export class SharedModule { }
