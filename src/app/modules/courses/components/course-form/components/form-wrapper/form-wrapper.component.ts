import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-wrapper",
  templateUrl: "./form-wrapper.component.html",
  styleUrls: ["./form-wrapper.component.scss"]
})
export class FormWrapperComponent implements OnInit {

  @ViewChild("overlay") overlay: ElementRef;

  @Input() title: string;

  @HostListener("click", ["$event"]) clicked(event: MouseEvent) {
    if (this.overlay.nativeElement === event.target) {
      this.onClose();
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.router.navigate(["courses"]);
  }

}
