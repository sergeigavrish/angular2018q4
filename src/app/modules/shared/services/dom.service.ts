import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Renderer2,
  Type,
  RendererFactory2,
  ElementRef
  } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DomService {

  private componentRef: ComponentRef<any>;
  private renderer: Renderer2;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  private getComponentRootNode<T>(componentRef: ComponentRef<T>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  attach(component: Type<any>, childComponent: Type<any>, elementRef: ElementRef, data?: Object): ComponentRef<any> {
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
    this.applicationRef.attachView(this.componentRef.hostView);
    this.renderer.appendChild(elementRef, this.getComponentRootNode(this.componentRef));
    this.componentRef.instance.component = childComponent;
    if (data) {
      this.componentRef.instance.data = data;
    }
    return this.componentRef;
  }

  dettach(): void {
    this.applicationRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

}
