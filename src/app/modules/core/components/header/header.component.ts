import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { UserName } from "../../../auth/models/interface/user-response.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  @Input() isAuthenticated: boolean;
  @Input() login: UserName;
  @Output() logOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onLogOut(event: MouseEvent): void {
    event.preventDefault();
    this.logOut.emit();
  }

  getUserName(): string {
    return this.login && `${this.login.first} ${this.login.last}`;
  }

}
