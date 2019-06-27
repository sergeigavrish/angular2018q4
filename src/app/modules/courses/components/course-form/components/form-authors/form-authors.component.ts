import {
  AbstractControl,
  ControlValueAccessor,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  HostListener
} from "@angular/core";

import {
  debounceTime,
  map,
  takeUntil,
  skipUntil,
  filter
} from "rxjs/operators";
import { fromEvent, Subject, pipe } from "rxjs";

import { HighlightMatchingPipe } from "../../../../../shared/pipes/highlight-matching.pipe";
import { IAuthor } from "../../../../models/interfaces/author.interface";
import { IndexedObject } from "../../../../../shared/models/interfaces/indexed-object.interface";
import { Unsubscribable } from "../../../../../shared/models/entity/unsubscribable.entity";
import { validatorsProviderFactory } from "../../../../factories/validators-provider.factory";
import { valueAccessorProviderFactory } from "../../../../factories/value-accessor-provider.factory";
import { MultiSelectMode } from "../../../../models/types";

@Component({
  selector: "app-form-authors",
  templateUrl: "./form-authors.component.html",
  styleUrls: ["./form-authors.component.scss"],
  providers: [
    valueAccessorProviderFactory<FormAuthorsComponent>(FormAuthorsComponent),
    validatorsProviderFactory<FormAuthorsComponent>(FormAuthorsComponent)
  ],
})
export class FormAuthorsComponent extends Unsubscribable implements AfterViewInit, ControlValueAccessor, Validator {

  @ViewChild("input") set elementRef(elementRef: ElementRef) {
    if (elementRef) {
      this.input = elementRef;
      fromEvent(this.input.nativeElement, "keyup")
        .pipe(takeUntil(this.ngUnsubscribe$))
        .pipe(this.keyupPipe())
        .subscribe(this.filterAuthors);
    }
  }

  @Input() errors: ValidationErrors | null;
  @Input("options")
  set options(value: IndexedObject<IAuthor>) {
    this.authors = value;
  }
  get options(): IndexedObject<IAuthor> {
    return Object.keys(this.authors).reduce((acc, key) => {
      if (!this.checkSelected(key)) {
        acc[key] = this.authors[key];
      }
      return acc;
    }, {});
  }

  private input: ElementRef;
  private authors: IndexedObject<IAuthor>;
  private maxValue = 4;
  private isClicked = new Subject();

  isOpened = false;
  isFocused = false;
  touched = false;
  dirty = false;
  selected: Array<IAuthor> = [];
  mode: MultiSelectMode = MultiSelectMode.list;
  filtered: Array<IAuthor> = [];

  get isNotFull() {
    return this.selected.length < this.maxValue;
  }

  @HostListener("click", ["$event"]) clickedInside(e: MouseEvent) {
    if (this.checkClick(e)) {
      this.onFocus();
    }
  }

  constructor(
    private el: ElementRef
  ) { super(); }

  ngAfterViewInit() {
    fromEvent(document, "click")
      .pipe(takeUntil(this.ngUnsubscribe$))
      .pipe(this.clickOutsidePipe())
      .subscribe(this.onBlur);
  }

  writeValue(obj: any): void {
    this.selected = [...obj];
    if (this.selected.length === 4) {
      this.isOpened = false;
    }
    this.onChange(this.selected);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.value && !c.value.length) {
      return { required: true };
    } else if (c.value && c.value.length > 4) {
      return { maxLength: true };
    }
    return null;
  }

  toogleList() {
    this.isOpened = !this.isOpened;
  }

  onDeletePill(id: string) {
    this.dirty = true;
    this.writeValue(this.selected.filter(a => a.id !== id));
  }

  onSelect(id: string) {
    if (this.mode === MultiSelectMode.input) {
      this.onCancelSearch();
    }
    this.dirty = true;
    return id && this.selected.length < 4 && this.authors[id] && this.writeValue(this.selected.concat(this.authors[id]));
  }

  onCancelSearch() {
    this.changeMode(MultiSelectMode.list);
    this.input.nativeElement.value = null;
    this.isOpened = false;
  }

  private onChange = (_: any) => { };

  private onTouched = () => { };

  private onBlur = () => {
    this.isFocused = false;
    this.touched = true;
    this.isOpened = false;
    this.onTouched();
  }

  private onFocus = () => {
    this.isFocused = true;
    this.isClicked.next("");
  }

  private filterAuthors = (v: string) => {
    if (!v) {
      return this.onCancelSearch();
    }
    this.changeMode(MultiSelectMode.input);
    this.filtered = Object.keys(this.authors).reduce((acc, k) => {
      const { firstName, lastName } = this.authors[k];
      const firstNameIndex = firstName.toLowerCase().indexOf(v);
      const lastNameIndex = lastName.toLowerCase().indexOf(v);
      if ((firstNameIndex !== -1 || lastNameIndex !== -1) && !this.checkSelected(k)) {
        const author = {
          id: this.authors[k].id,
          firstName: firstNameIndex !== -1 ? new HighlightMatchingPipe().transform(firstName, v) : firstName,
          lastName: lastNameIndex !== -1 ? new HighlightMatchingPipe().transform(firstName, v) : lastName
        };
        acc.push(author);
      }
      return acc;
    }, []);
  }

  private changeMode(m: MultiSelectMode) {
    this.mode = m;
  }

  private checkSelected(k: string): boolean {
    return !!this.selected.find(a => a.id === k);
  }

  private checkClick = (e: MouseEvent) => {
    return this.el.nativeElement.contains(e.target);
  }

  private keyupPipe() {
    return pipe(
      map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value),
      debounceTime(500),
      map(v => v.trim().toLowerCase()),
    );
  }

  private clickOutsidePipe = () => {
    return pipe(
      filter((e: MouseEvent) => !this.checkClick(e)),
      skipUntil(this.isClicked.asObservable()),
    );
  }

}
