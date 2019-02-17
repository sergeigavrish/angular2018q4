import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root"
})
export class CourseDeleteService {

  constructor(private coursesService: CoursesService) { }

  delete(id: string): Observable<boolean> {
    return this.coursesService.deleteCourse(id);
  }

}
