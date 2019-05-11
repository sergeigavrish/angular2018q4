import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Injectable, Type } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalService {

  private isOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private hideOveray$: Subject<void> = new Subject();
  private data$: BehaviorSubject<Object | null> = new BehaviorSubject<Object | null>(null);
  private title$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private component$: BehaviorSubject<Type<any> | null> = new BehaviorSubject<Type<any> | null>(null);

  constructor() { }

  getIsOpened(): Observable<boolean> {
    return this.isOpened$.asObservable();
  }

  setIsOpened(value: boolean = false): void {
    this.isOpened$.next(value);
  }

  getData(): Object | null {
    return this.data$.getValue();
  }

  setData(data: any = null): void {
    this.data$.next(data);
  }

  getTitle(): string {
    return this.title$.getValue();
  }

  setTitle(title: string): void {
    this.title$.next(title);
  }

  getComponent(): Observable<Type<any> | null> {
    return this.component$.asObservable();
  }

  setComponent(component: Type<any> = null): void {
    this.component$.next(component);
  }

  getHideOveray(): Observable<void> {
    return this.hideOveray$.asObservable();
  }

  hideOveray() {
    this.hideOveray$.next();
  }

  init(component: Type<any>, title: string, data?: Object): void {
    if (data) {
      this.setData(data);
    }
    this.setTitle(title);
    this.setComponent(component);
  }

  close(): void {
    this.setIsOpened();
    this.setComponent();
    this.setData();
  }

}
