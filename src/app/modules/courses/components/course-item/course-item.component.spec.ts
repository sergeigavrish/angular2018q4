import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Component, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";

import { Course } from "./../../models/interfaces/course.interface";
import { CourseEntity } from "./../../models/entity/course.entity";
import { CourseItemComponent } from "./course-item.component";
import { DurationPipe } from "./../../pipes/duration.pipe";


describe("Test CourseItemComponent as a class", () => {
  it("should raises the delete event when clicked", () => {
    const component = new CourseItemComponent();
    // tslint:disable-next-line:max-line-length
    const course: Course = new CourseEntity("1", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell", true);
    component.course = course;
    component.delete.subscribe((selectedCourse: Course) => expect(selectedCourse).toBe(course));
    component.onDeleteClick();
  });
});

describe("CourseItemComponent stand alone testing", () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let course: Course;
  let deleteButtonDebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent,
        DurationPipe
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    deleteButtonDebugElement = fixture.debugElement.query(By.css(".delete"));
    // tslint:disable-next-line:max-line-length
    course = new CourseEntity("1", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell", true);
    component.course = course;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render course item card ", () => {
    const courses = fixture.debugElement.queryAll(By.css(".course"));
    expect(courses.length).toBeTruthy();
  });

  it("should raises the delete event when clicked", () => {
    let courseToDelete: Course;
    component.delete.subscribe((selectedCourse: Course) => courseToDelete = selectedCourse);
    deleteButtonDebugElement.triggerEventHandler("click", null);
    expect(courseToDelete).toBe(course);
  });
});

@Component({
  template: `
    <app-course-item
      [course]="course" (delete)="onDelete($event)">
    </app-course-item>`
})
class TestHostComponent {
  // tslint:disable-next-line:max-line-length
  course = new CourseEntity("1", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell", true);
  courseToDelete: Course;
  onDelete(course: Course) { this.courseToDelete = course; }
}

describe("CourseItemComponent test host testing", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let deleteButtonDebugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CourseItemComponent,
        DurationPipe
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    deleteButtonDebugElement = fixture.debugElement.query(By.css(".delete"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render course item card in a Host ", () => {
    const courses = fixture.debugElement.queryAll(By.css(".course"));
    expect(courses.length).toBeTruthy();
  });

  it("should raises the delete event when clicked", () => {
    deleteButtonDebugElement.triggerEventHandler("click", null);
    expect(component.courseToDelete).toBe(component.course);
  });
});
