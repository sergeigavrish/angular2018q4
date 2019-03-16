import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from "@angular/router";

import { BehaviorSubject } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.setTitle();
  }

  private setTitle() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          let routeWithTitle = route;
          while (route.firstChild) {
            if ((<BehaviorSubject<any>>route.firstChild.data).getValue().title) {
              routeWithTitle = route.firstChild;
            }
            route = route.firstChild;
          }
          return routeWithTitle;
        }),
        filter(route => route.outlet === PRIMARY_OUTLET),
        switchMap(route => route.data)
      )
      .subscribe(data => {
        this.title.setTitle(data.title);
      });
  }
}
