import { Observable } from "rxjs";

export interface Storage<T> {
  load(id?: string): Observable<T | T[] | boolean>;
  save(data: T): Observable<boolean>;
  update(data: T, id: string): Observable<boolean>;
  delete(id: string): Observable<boolean>;
}
