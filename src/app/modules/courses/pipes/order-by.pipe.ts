import { Pipe, PipeTransform } from "@angular/core";

import { Course } from "./../models/interfaces/course.interface";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[]): any {
    return [...courses].sort((current: Course, next: Course) => next.date.getTime() - current.date.getTime());
  }

}
