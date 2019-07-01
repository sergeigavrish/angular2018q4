import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { Observable } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

import { ModalDirective } from "../../directives/modal.directive";
import { ModalService } from "../../services/modal.service";
import { Unsubscribable } from "../../models/entity/unsubscribable.entity";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent extends Unsubscribable implements OnInit, AfterViewInit {

  @ViewChild("overlay") overlay: ElementRef;
  @ViewChild(ModalDirective) appModal: ModalDirective;

  isOpened$: Observable<boolean>;

  @HostListener("click", ["$event"]) clicked(event: MouseEvent) {
    if (this.overlay.nativeElement === event.target) {
      this.onClose();
    }
  }

  constructor(
    private modalService: ModalService,
  ) { super(); }

  ngOnInit() {
    this.isOpened$ = this.modalService.getIsOpened();
    this.modalService.getHideOveray()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => this.appModal.hideModalOverlay(this.overlay.nativeElement));
  }

  ngAfterViewInit() {
    this.modalService
      .getComponent()
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        filter(component => !!component)
      )
      .subscribe(component => {
        this.appModal.loadComponent(component, this.modalService.getData());
      });
  }

  getTitle() {
    return this.modalService.getTitle();
  }

  onClose() {
    this.appModal.dettach();
    this.modalService.close();
  }

}
