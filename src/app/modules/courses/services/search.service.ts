import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class SearchService {

  private searchValue$: BehaviorSubject<string> = new BehaviorSubject("");

  constructor() { }

  getSearchValue(): Observable<string> {
    return this.searchValue$.asObservable().pipe(
      map((value: string) => value.trim().toLowerCase())
    );
  }

  setSearchValue(value: string): void {
    this.searchValue$.next(value);
  }

}
