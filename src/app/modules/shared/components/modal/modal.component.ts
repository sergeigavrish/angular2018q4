import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  Type
} from "@angular/core";

import { ModalDirective } from "../../directives/modal.directive";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() component: Type<any>;
  @Input() data?: Object;

  @ViewChild("overlay") overlay: ElementRef;
  @ViewChild(ModalDirective) appModal: ModalDirective;

  @HostListener("click", ["$event"]) clicked(event: MouseEvent) {
    if (this.overlay.nativeElement === event.target) {
      this.modalService.close();
    }
  }

  constructor(
    private modalService: ModalService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadComponent();
  }

  ngOnDestroy() {
    this.appModal.viewContainerRef.detach();
  }

  private loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    const viewContainerRef = this.appModal.viewContainerRef;
    const componentRef = viewContainerRef.createComponent(componentFactory);
    if (this.data) {
      Object.keys(this.data).map(key => (<Component>componentRef.instance)[key] = this.data[key]);
    }
  }

}
