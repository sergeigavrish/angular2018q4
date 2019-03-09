import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";

import { Observable } from "rxjs";
import { filter } from "rxjs/operators";

import { ModalDirective } from "../../directives/modal.directive";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, AfterViewInit {

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
  ) { }

  ngOnInit() {
    this.isOpened$ = this.modalService.getIsOpened();
  }

  ngAfterViewInit() {
    this.modalService
      .getComponent()
      .pipe(
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
