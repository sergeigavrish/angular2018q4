import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";

import { fromEvent } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";
import { SearchService } from "../../services/search.service";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";

@Component({
  selector: "app-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.scss"]
})
export class SearchPanelComponent extends Unsubscribable implements OnInit {

  @Input() placeholder: string;

  @ViewChild("sp") sp: ElementRef;

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    fromEvent(this.sp.nativeElement, "keyup")
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        tap((e: KeyboardEvent) => {
          if ((<HTMLInputElement>e.target).value.length < 3) {
            this.searchService.setFoundCourses([]);
          }
        }),
        map(e => (<HTMLInputElement>e.target).value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(this.searchService.search)
      )
      .subscribe(this.searchService.setFoundCourses);
  }

}
