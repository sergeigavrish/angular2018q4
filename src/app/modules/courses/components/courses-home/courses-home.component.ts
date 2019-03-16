import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses-home",
  templateUrl: "./courses-home.component.html",
  styleUrls: ["./courses-home.component.scss"]
})
export class CoursesHomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  loadMore(): void {
    console.log("loadMore");
  }

  onAdd() {
    this.router.navigate(["courses/new"]);
  }

}
