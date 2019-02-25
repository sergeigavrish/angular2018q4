import { OnDestroy } from "@angular/core";

import { Subject } from "rxjs";

export class Unsubscribable implements OnDestroy {

  protected ngUnsubscribe$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
