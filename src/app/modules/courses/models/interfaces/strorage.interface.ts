import { Observable } from "rxjs";

export interface Load<T> {
  loadReq<U>(opts?: U): Observable<T | T[]>;
}

export interface Storage<T> extends Load<T> {
  saveReq<U extends object>(data: U): Observable<T | boolean>;
  updateReq(data: T, id: string): Observable<T | boolean>;
  deleteReq(id: string): Observable<string | boolean>;
}
