import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { takeUntil } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { Course } from "../../models/interfaces/course.interface";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { OverlayService } from "../../../shared/services/overlay.service";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { CreateCourseStarted, UpdateCourseStarted } from "../../store/courses.actions";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent extends Unsubscribable implements OnInit, OnDestroy {

  course: Course;
  formTitle: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private overlayService: OverlayService,
    private store: Store<AppState>
  ) { super(); }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.course = { ...data.course };
        this.formTitle = data.course ? data.course.title : "Add new course";
      });
    this.overlayService.hideOverlay();
  }

  ngOnDestroy() {
    this.overlayService.showOverlay();
  }

  onSave() {
    console.log(this.course);
    this.router.navigate(["courses"]);
    if (this.course.id) {
      return this.store.dispatch(new UpdateCourseStarted(this.course));
    } else {
      return this.store.dispatch(new CreateCourseStarted(this.course));
    }
  }

  onCancel() {
    this.router.navigate(["courses"]);
  }

}
