import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated: boolean;
  @Input() login?: string;
  @Output() logOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onLogOut(event: MouseEvent): void {
    event.preventDefault();
    this.logOut.emit();
  }

}
