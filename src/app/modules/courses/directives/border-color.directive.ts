import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  Inject
} from "@angular/core";

import { BORDER_COLOR_TOKEN } from "./../providers/border-color.provider";
import { BorderColorClasses } from "../models/interfaces/border-color-classes.interface";

@Directive({
  selector: "[appBorderColor]"
})
export class BorderColorDirective implements OnChanges {

  @Input("appBorderColor") date: Date;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(BORDER_COLOR_TOKEN) private classes: BorderColorClasses
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.date) {
      this.checkDate();
    }
  }

  checkDate() {
    const currentDate = new Date();
    const fourteenDaysBefore = new Date();
    fourteenDaysBefore.setDate(fourteenDaysBefore.getDate() - 14);
    if (this.date < currentDate && this.date >= fourteenDaysBefore) {
      this.renderer.addClass(this.el.nativeElement, this.classes.new);
    } else if (this.date > currentDate) {
      this.renderer.addClass(this.el.nativeElement, this.classes.upcoming);
    }
  }

}
