import { Pipe, PipeTransform } from "@angular/core";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Course } from "../models/interfaces/course.interface";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {

  transform(courses$: Observable<Course[]>, input: string): Observable<Course[]> {
    return courses$.pipe(
      map((courses: Course[]) => courses.filter((course: Course) => course && course.name.toLowerCase().includes(input))),
      tap(console.log)
    );
  }

}
