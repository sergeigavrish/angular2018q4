import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of, pipe } from "rxjs";
import { tap, catchError, delay, mergeMap } from "rxjs/operators";

import { LoaderService } from "../../core/services/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.loading();
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const clonedReq: HttpRequest<any> = req.clone({
      headers: req.headers.set("Authorization", token),
    });
    return next.handle(clonedReq).pipe(this.interceptHandlePipe());
  }

  private interceptHandlePipe() {
    return pipe(
      mergeMap(evt => {
        if (evt instanceof HttpResponse) {
          return of(evt).pipe(
            delay(1500),
            tap(() => this.loaderService.done())
          );
        }
        return of(evt);
      }),
      catchError(err => {
        this.loaderService.done();
        return of(err);
      })
    );
  }

}
