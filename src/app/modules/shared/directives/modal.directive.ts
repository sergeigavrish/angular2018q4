import {
  Component,
  ComponentFactoryResolver,
  Directive,
  OnInit,
  Type,
  ViewContainerRef,
  Renderer2
} from "@angular/core";

import { filter, takeUntil } from "rxjs/operators";

import { ModalService } from "./../services/modal.service";
import { Unsubscribable } from "../models/entity/unsubscribable.entity";
import { OverlayService } from "../services/overlay.service";


@Directive({
  selector: "[appModal]"
})
export class ModalDirective extends Unsubscribable implements OnInit {


  constructor(
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlayService: OverlayService
  ) { super(); }

  ngOnInit() {
    this.modalService.getIsOpened()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(isOpened => !isOpened)
      ).subscribe(() => this.dettach());
  }

  loadComponent(component: Type<any>, data?: Object): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (data) {
      Object.keys(data).map(key => (<Component>componentRef.instance)[key] = data[key]);
    }
    this.overlayService.hideOverlay();
    this.modalService.setIsOpened(true);
  }

  dettach() {
    this.viewContainerRef.clear();
    this.overlayService.showOverlay();
  }

}
