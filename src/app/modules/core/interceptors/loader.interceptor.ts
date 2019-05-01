import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of, pipe } from "rxjs";
import { tap, catchError, delay, mergeMap } from "rxjs/operators";

import { LoaderService } from "../../core/services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private reqCount = new Set<string>();

  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.reqCount.add(req.url);
    this.loaderService.loading();
    return next.handle(req).pipe(this.interceptHandlePipe(req.url));
  }

  private interceptHandlePipe(url: string) {
    return pipe(
      mergeMap(evt => {
        if (evt instanceof HttpResponse) {
          return of(evt).pipe(
            delay(1500),
            tap(() => this.handleLoader(url)),
          );
        }
        return of(evt);
      }),
      catchError(err => {
        this.handleLoader(url);
        return of(err);
      })
    );
  }

  private handleLoader(url: string): void {
    this.reqCount.delete(url);
    if (!this.reqCount.size) {
      this.loaderService.done();
    }
  }

}
