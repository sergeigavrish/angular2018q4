import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { AuthService } from "./../services/auth.service";
import { LoaderService } from "./../../shared/services/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.loading();
    const token = this.authService.getToken() ? this.authService.getToken() : "";
    const clonedReq: HttpRequest<any> = req.clone({
      headers: req.headers.set("Authorization", token),
    });
    return next.handle(clonedReq).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.loaderService.done();
        }
      }),
      catchError(err => {
        this.loaderService.done();
        return of(err);
      })
    );
  }

}
