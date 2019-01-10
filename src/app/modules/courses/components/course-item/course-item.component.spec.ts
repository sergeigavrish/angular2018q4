import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { CourseEntity } from "./../../models/entity/course.entity";
import { CourseItemComponent } from "./course-item.component";

describe("CourseItemComponent", () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseItemComponent
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
    // tslint:disable-next-line:max-line-length
    component.course = new CourseEntity("1", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
