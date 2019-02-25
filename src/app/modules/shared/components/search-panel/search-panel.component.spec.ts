import { SearchService } from "./../../../courses/services/search.service";
import { async, ComponentFixture, TestBed, flush, fakeAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { SearchPanelComponent } from "./search-panel.component";

describe("SearchPanelComponent", () => {
  let component: SearchPanelComponent;
  let fixture: ComponentFixture<SearchPanelComponent>;
  let button: DebugElement;
  let input: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchPanelComponent
      ],
      providers: [
        SearchService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.css("button"));
    input = fixture.debugElement.query(By.css("input"));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set placeholder", () => {
    component.placeholder = "placeholder";
    fixture.detectChanges();
    expect(input.nativeElement.placeholder).toEqual(component.placeholder);
  });

  it("should call setInputValue", () => {
    const setInputValue = spyOn(component, "setInputValue").and.callThrough();
    input.nativeElement.value = "hello";
    const event = { target: input.nativeElement };
    input.triggerEventHandler("input", event);
    expect(setInputValue).toHaveBeenCalled();
    expect(component.inputValue.getValue()).toEqual(input.nativeElement.value);
  });

  it("should call search and focus input element", () => {
    button.triggerEventHandler("click", new Event("click"));
    expect(document.activeElement === input.nativeElement).toBeTruthy();
  });

  it("should call search and log inputValue value", () => {
    const search = spyOn(component, "onSearchClick").and.callThrough();
    input.nativeElement.value = "hello 2";
    const event = { target: input.nativeElement };
    input.triggerEventHandler("input", event);
    button.triggerEventHandler("click", new Event("click"));
    expect(search).toHaveBeenCalled();
    expect(component.inputValue.getValue()).toEqual(input.nativeElement.value);
  });

});
