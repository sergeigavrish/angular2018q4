import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DurationPipe } from "./duration.pipe";

@Component({
  template: `
  <p>{{duration | duration}}</p>`
})
class TestComponent {
  duration = 130;
 }

describe("DurationPipe", () => {
  const pipe = new DurationPipe();
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [DurationPipe, TestComponent],
    })
      .createComponent(TestComponent);

    fixture.detectChanges();
  });


  it("should transforms 130 to '2h 10min'", () => {
    expect(pipe.transform(130)).toBe("2h 10min");
  });

  it("should transforms 20 to '20min'", () => {
    expect(pipe.transform(20)).toBe("20min");
  });

  it("should convert duration value to '2h 10min", () => {
    const hostElement = fixture.nativeElement;
    const elementWithPipe: HTMLElement = hostElement.querySelector("p");

    fixture.detectChanges();

    expect(elementWithPipe.textContent).toBe("2h 10min");
  });

});
