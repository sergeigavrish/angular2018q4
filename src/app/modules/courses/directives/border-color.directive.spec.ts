import { By } from "@angular/platform-browser";
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BorderColorDirective } from "./border-color.directive";
import { borderColorProvider } from "./../providers/border-color.provider";

@Component({
  template: `
  <div [appBorderColor]="date1">New date</div>
  <div [appBorderColor]="date2">Upcoming date</div>
  <div>No border color</div>`
})
class TestComponent {
  date1 = new Date();
  date2 = new Date();
  constructor() {
    this.date1.setDate(this.date1.getDate() - 10);
    this.date2.setDate(this.date2.getDate() + 10);
  }
}

describe("BorderColorDirective", () => {
  let elementsWithDirective: DebugElement[];
  let bareDiv;
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [BorderColorDirective, TestComponent],
      providers: [borderColorProvider]
    })
      .createComponent(TestComponent);

    fixture.detectChanges();

    elementsWithDirective = fixture.debugElement.queryAll(By.directive(BorderColorDirective));

    bareDiv = fixture.debugElement.query(By.css("div:not([appBorderColor])"));
  });

  it("should have 2 elements with directive", () => {
    expect(elementsWithDirective.length).toBe(2);
  });

  it("should add 1st <div> class 'new'", () => {
    const bgColor = elementsWithDirective[0].classes["new"];
    expect(bgColor).toBeTruthy();
  });

  it("should add 1st <div> class 'upcoming'", () => {
    const bgColor = elementsWithDirective[1].classes["upcoming"];
    expect(bgColor).toBeTruthy();
  });

  it("bare <div> should not have a customProperty", () => {
    expect(bareDiv.properties["customProperty"]).toBeUndefined();
  });
});
