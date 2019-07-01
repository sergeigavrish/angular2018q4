import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router
} from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { filter } from "rxjs/operators";

import { Breadcrumb } from "../../models/interfaces/breadcrumb.interface";

@Component({
  selector: "app-breadcrumbs",
  templateUrl: "./breadcrumbs.component.html",
  styleUrls: ["./breadcrumbs.component.scss"]
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Array<Breadcrumb>;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.breadcrumbs = this.getBreadcrumbs(this.route.root);
      });
  }

  private getBreadcrumbs(route: ActivatedRoute, url = "", breadcrumbs = []) {

    const children: Array<ActivatedRoute> = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    children.map(child => {

      if (child.outlet !== PRIMARY_OUTLET || !child.snapshot.url.length) {
        return;
      }

      if (!child.snapshot.data.breadcrumb) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      const routeURL = child.snapshot.url.map(segment => segment.path).join("/");
      url += `/${routeURL}`;

      const breadcrumb = {
        label: child.snapshot.data.breadcrumb,
        url: url
      };
      breadcrumbs.push(breadcrumb);

      return this.getBreadcrumbs(child, url, breadcrumbs);
    });

    return breadcrumbs;

  }

}
