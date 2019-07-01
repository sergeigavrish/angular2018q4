import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";

import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
  filter
} from "rxjs/operators";

import { Store } from "@ngrx/store";

import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { SearchCoursesStarted, RestoreCoursesStarted } from "./../../../courses/store/courses.actions";
import { AppState } from "./../../models/interfaces/app-state.interface";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent extends Unsubscribable implements OnInit {

  @Input() placeholder: string;

  @ViewChild("sp") sp: ElementRef;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { super(); }

  ngOnInit() {
    fromEvent(this.sp.nativeElement, "keyup")
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        tap((e: KeyboardEvent) => {
          if (!(<HTMLInputElement>e.target).value.length) {
            this.store.dispatch(new RestoreCoursesStarted);
          }
        }),
        map(e => (<HTMLInputElement>e.target).value),
        debounceTime(500),
        distinctUntilChanged(),
        map(v => v.trim().toLowerCase()),
        filter(v => v.length >= 3),
      )
      .subscribe(v => {
        this.router.navigate(["courses"]);
        this.store.dispatch(new SearchCoursesStarted(v));
      });
  }

}
