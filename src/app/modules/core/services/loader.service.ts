import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  loading = (): void => {
    this.loading$.next(true);
  }

  done = (): void => {
    this.loading$.next(false);
  }

}
