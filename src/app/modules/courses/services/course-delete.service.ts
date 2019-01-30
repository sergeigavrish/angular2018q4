import { Injectable } from "@angular/core";

import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CourseDeleteService {

  private isConfirmed$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  getIsConfirmed(): Observable<boolean> {
    return this.isConfirmed$.asObservable();
  }

  setIsConfirmed(value: boolean): void {
    this.isConfirmed$.next(value);
  }

}
