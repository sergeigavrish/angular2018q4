import { Component, OnInit, Input } from "@angular/core";

import { takeUntil, tap } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { CoursesService } from "./../../services/courses.service";
import { ModalService } from "../../../shared/services/modal.service";
import { Unsubscribable } from "./../../../shared/models/entity/unsubscribable.entity";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { DeleteCourse } from "../../store/courses.actions";

@Component({
  selector: "app-course-delete",
  templateUrl: "./course-delete.component.html",
  styleUrls: ["./course-delete.component.scss"]
})
export class CourseDeleteComponent extends Unsubscribable implements OnInit {

  @Input() title: string;
  @Input() id: string;

  constructor(
    private courseService: CoursesService,
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
    this.courseService.deleteCourse(this.id)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        tap(res => {
          if (res && typeof res === "string") {
            this.store.dispatch(new DeleteCourse(res));
          }
        })
      )
      .subscribe(c => {
        this.modalService.close();
      });
  }

}
