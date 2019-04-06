import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";

import { Observable } from "rxjs";

import { AuthService } from "./../services/auth.service";
import { INTERCEPTION_URLS_TOKEN } from "./../providers/InterceptionUrlProvder";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    @Inject(INTERCEPTION_URLS_TOKEN) private interceptionUrls: Array<string>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.shouldIntercept(req.url)) {
      const clonedReq: HttpRequest<any> = req.clone({
        headers: req.headers.set("Authorization", this.authService.getToken()),
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);

  }

  private shouldIntercept(url: string) {
    return this.interceptionUrls.some(u => url.includes(u)) && this.authService.getToken();
  }

}
