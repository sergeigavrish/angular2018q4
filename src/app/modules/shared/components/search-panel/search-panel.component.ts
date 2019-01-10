import { Component, OnInit, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent implements OnInit {

  @Input() placeholder: string;
  inputValue = new BehaviorSubject<string>("");

  constructor() { }

  ngOnInit() {
  }

  search(event, inputElement): void {
    event.preventDefault();
    if (!this.inputValue.getValue()) {
      return inputElement.focus();
    }
    console.log("search", this.inputValue.getValue());
  }

  setInputValue(event): void {
    this.inputValue.next(event.target.value);
  }

}
