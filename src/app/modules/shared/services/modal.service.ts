import { Injectable, Type, ElementRef } from "@angular/core";

import { DomService } from "./dom.service";

@Injectable({
  providedIn: "root"
})
export class ModalService {

  constructor(
    private domService: DomService
  ) { }

  open(modalComponent: Type<any>, childComponent: Type<any>, elementRef: ElementRef, data?: Object) {
    this.domService.attach(modalComponent, childComponent, elementRef, data);
  }

  close() {
    this.domService.dettach();
  }

}
