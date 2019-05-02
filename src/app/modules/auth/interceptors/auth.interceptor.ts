import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { AuthService } from "./../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken() ? this.authService.getToken() : "";
    const clonedReq: HttpRequest<any> = req.clone({
      headers: req.headers.set("Authorization", token),
    });
    return next.handle(clonedReq);
  }

}
