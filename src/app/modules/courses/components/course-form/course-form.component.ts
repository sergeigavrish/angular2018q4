import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

import { CoursesService } from "../../services/courses.service";
import { Course } from "../../models/interfaces/course.interface";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { OverlayService } from "../../../shared/services/overlay.service";

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
    private overlayService: OverlayService
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
      res = this.coursesService.updateCourse(this.course, this.course.id);
    } else {
      res = this.coursesService.createCourse(this.course);
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

}
