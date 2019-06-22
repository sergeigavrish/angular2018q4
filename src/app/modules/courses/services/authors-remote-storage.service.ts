import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import {
  Observable,
  of,
  pipe
} from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";

import { environment } from "../../../../environments/environment";
import { Load } from "../models/interfaces/strorage.interface";
import { IAuthorResponse, isArrayIAuthorResponse } from "../models/interfaces/author.interface";

@Injectable({
  providedIn: "root"
})
export class AuthorsRemoteStorageService implements Load<IAuthorResponse> {

  constructor(private http: HttpClient) { }

  private handleRespons<T>(data: Array<T>) {
    return of(data).pipe(
      map(this.checkRespons<T>())
    );
  }

  private checkRespons<T>() {
    return (data: Array<T>) => {
      if (isArrayIAuthorResponse(data)) {
        return data;
      }
      return null;
    };
  }

  private setupRespons<T>() {
    return (data: Array<T>) => this.handleRespons(data);
  }

  private handleErrorPipe() {
    return pipe(
      catchError(error => {
        console.warn(error.message);
        return of(null);
      })
    );
  }

  loadReq<U>(opts?: U): Observable<IAuthorResponse | IAuthorResponse[]> {
    return this.http.get<Array<IAuthorResponse>>(`${environment.backendUrl}/authors`).pipe(
      switchMap(this.setupRespons<IAuthorResponse>()),
      this.handleErrorPipe()
    );
  }

}
