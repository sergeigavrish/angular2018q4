import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class OverlayService {

  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2
  ) { this.renderer = this.rendererFactory.createRenderer(null, null); }

  hideOverlay(): void {
    this.renderer.addClass(document.body, "modal-opened");
  }

  showOverlay() {
    this.renderer.removeClass(document.body, "modal-opened");
  }

}
