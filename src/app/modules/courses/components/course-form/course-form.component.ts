import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable, pipe } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";

import { Store } from "@ngrx/store";

import { CoursesService } from "../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { OverlayService } from "../../../shared/services/overlay.service";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { UpdateCourse, CreateCourse } from "../../store/courses.actions";
import { CourseEntity } from "../../models/entity/course.entity";

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
    private coursesService: CoursesService,
    private overlayService: OverlayService,
    private store: Store<AppState>
  ) { super(); }

  ngOnInit() {
    this.route.data
      .pipe(
        map(data => data),
        takeUntil(this.ngUnsubscribe$)
      )
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
    let res: Observable<any>;
    if (this.course.id) {
      res = this.coursesService.updateCourse(this.course, this.course.id).pipe(this.handleResponsePipe(UpdateCourse));
    } else {
      res = this.coursesService.createCourse(this.course).pipe(this.handleResponsePipe(CreateCourse));
    }
    res
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(() => {
        this.router.navigate(["courses"]);
      });
  }

  onCancel() {
    this.router.navigate(["courses"]);
  }

  private handleResponsePipe(action: new (res: Course) => UpdateCourse | CreateCourse) {
    return pipe(
      tap((res: Course | boolean) => {
        if (CourseEntity.isCourse(res)) {
          this.store.dispatch(new action(res));
        }
      })
    );
  }

}
