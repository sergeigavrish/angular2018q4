import { Component, Input, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { SearchService } from "./../../../courses/services/search.service";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent implements OnInit {

  @Input() placeholder: string;

  inputValue$: Observable<string>;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.inputValue$ = this.searchService.getSearchValue();
  }

  onEnter() {
    this.searchService.setSearchValue();
  }

  setInputValue(event: KeyboardEvent): void {
    this.searchService.setSearchValue((<HTMLInputElement>event.target).value);
  }

}
