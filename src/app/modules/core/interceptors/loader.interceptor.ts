import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of, pipe } from "rxjs";
import { tap, catchError, delay, mergeMap } from "rxjs/operators";

import { LoaderService } from "../../core/services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private reqCount = 0;

  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqCount++;
    this.loaderService.loading();
    return next.handle(req).pipe(this.interceptHandlePipe());
  }

  private interceptHandlePipe() {
    return pipe(
      mergeMap(evt => {
        if (evt instanceof HttpResponse) {
          return of(evt).pipe(
            delay(1500),
            tap(this.handleLoader),
          );
        }
        return of(evt);
      }),
      catchError(err => {
        this.handleLoader();
        return of(err);
      })
    );
  }

  private handleLoader = (): void => {
    if (this.reqCount > 0) {
      this.reqCount--;
    }
    if (!this.reqCount) {
      this.loaderService.done();
    }
  }

}
