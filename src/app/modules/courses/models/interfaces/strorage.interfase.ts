import { Observable } from "rxjs";

export interface Storage<T> {
  load<U>(opts: U): Observable<T | T[]>;
  save(data: T): Observable<boolean>;
  update(data: T, id: string): Observable<boolean>;
  delete(id: string): Observable<boolean>;
}
