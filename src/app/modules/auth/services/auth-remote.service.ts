import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "./../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthRemoteService {

  constructor(private http: HttpClient) { }

  login<T, U>(data: T): Observable<U> {
    return this.post<T, U>(data, `${environment.backendUrl}/auth/login`);
  }

  getUserInfo<T, U>(data: T): Observable<U> {
    return this.post<T, U>(data, `${environment.backendUrl}/auth/userinfo`);
  }

  private post<T, U>(data: T, url: string): Observable<U> {
    return this.http.post<U>(url, data);
  }

}
