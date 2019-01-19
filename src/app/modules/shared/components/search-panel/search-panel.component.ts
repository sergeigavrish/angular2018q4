import { BehaviorSubject } from "rxjs";
import { Component, Input } from "@angular/core";

import { SearchService } from "./../../../courses/services/search.service";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent {

  @Input() placeholder: string;

  inputValue = new BehaviorSubject<string>("");

  constructor(private searchService: SearchService) { }

  onSearchClick(event: MouseEvent, inputElement: HTMLElement): void {
    event.preventDefault();
    if (!this.inputValue.getValue()) {
      return inputElement.focus();
    }
    console.log("search", this.inputValue.getValue());
    this.searchService.setSearchValue(this.inputValue.getValue());
  }

  onEnter() {
    this.searchService.setSearchValue(this.inputValue.getValue());
  }

  setInputValue(event: KeyboardEvent): void {
    this.inputValue.next((<HTMLInputElement>event.target).value);
    if (!(<HTMLInputElement>event.target).value) {
      this.searchService.setSearchValue(this.inputValue.getValue());
    }
  }

}
