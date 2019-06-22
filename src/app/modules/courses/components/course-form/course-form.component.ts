import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { Store, select } from "@ngrx/store";

import { Course } from "../../models/interfaces/course.interface";
import { Unsubscribable } from "../../../shared/models/entity/unsubscribable.entity";
import { OverlayService } from "../../../shared/services/overlay.service";
import { AppState } from "../../../core/models/interfaces/app-state.interface";
import { CreateCourseStarted, UpdateCourseStarted } from "../../store/courses.actions";
import { ICourseEntity } from "../../models/interfaces/course-entity.interface";
import { CourseEntity } from "../../models/entity/course.entity";
import { IAuthor } from "../../models/interfaces/author.interface";
import { selectAuthors } from "../../store/authors.selectors";
import { IndexedObject } from "../../../shared/models/interfaces/indexed-object.interface";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent extends Unsubscribable implements OnInit, OnDestroy {

  formTitle: string;
  courseForm: FormGroup;
  authors$: Observable<IndexedObject<IAuthor>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private overlayService: OverlayService,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) { super(); }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        this.buildForm({ ...data.course });
        this.formTitle = data.course ? data.course.title : "Add new course";
      });
    this.overlayService.hideOverlay();
    this.authors$ = this.store.pipe(select(selectAuthors));
  }

  ngOnDestroy() {
    this.overlayService.showOverlay();
  }

  onSave() {
    console.log(this.courseForm.value);
    this.router.navigate(["courses"]);
    if (CourseEntity.isCourseEntity(this.courseForm.value)) {
      return this.store.dispatch(new UpdateCourseStarted(this.courseForm.value));
    } else {
      return this.store.dispatch(new CreateCourseStarted(this.courseForm.value));
    }
  }

  onCancel() {
    this.router.navigate(["courses"]);
  }

  private buildForm(c: Course | ICourseEntity) {
    this.courseForm = this.fb.group({
      id: [(<ICourseEntity>c).id],
      name: [c.name, [Validators.required, Validators.maxLength(50)]],
      date: [c.date],
      length: [c.length],
      topRated: [!!c.topRated],
      description: [c.description, [Validators.required, Validators.maxLength(500)]],
      authors: [c.authors || [], [Validators.required, Validators.maxLength(4)]]
    });
  }

}
