import { Component, OnInit, Input } from "@angular/core";


import { Store } from "@ngrx/store";

import { ModalService } from "../../../shared/services/modal.service";
import { Unsubscribable } from "./../../../shared/models/entity/unsubscribable.entity";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { DeleteCourseStarted } from "../../store/courses.actions";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.scss"]
})
export class CourseDeleteComponent extends Unsubscribable implements OnInit {

  @Input() title: string;
  @Input() id: string;

  constructor(
    private modalService: ModalService,
    private store: Store<AppState>
  ) { super(); }

  ngOnInit() {
  }

  onCancel(): void {
    this.modalService.close();
  }

  onConfirm() {
    this.modalService.hideOveray();
    this.store.dispatch(new DeleteCourseStarted(this.id));
    this.modalService.close();
  }

}
