import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "";
    const clonedReq: HttpRequest<any> = req.clone({
      headers: req.headers.set("Authorization", token),
    });
    return next.handle(clonedReq);
  }

}
