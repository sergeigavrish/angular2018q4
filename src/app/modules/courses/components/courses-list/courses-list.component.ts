import { Component, OnInit } from "@angular/core";
import { Course } from "../../models/interfaces/course.interface";
import { CourseEntity } from "../../models/entity/course.entity";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {

  courses: Course[];

  constructor() { }
  // https://upload.wikimedia.org/wikipedia/en/f/fc/Walken-Cowbell.jpg
  ngOnInit() {
    // tslint:disable:max-line-length
    this.courses = [
      new CourseEntity("1", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("2", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("3", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("4", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("5", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("6", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("7", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("8", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("9", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("10", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("11", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("12", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("13", "Learn how u can use moar cowbell 1", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
      new CourseEntity("14", "Learn how u can use moar cowbell 2", new Date(), 1, "Guess what? You got a fever. And the only prescription is moar cowbell"),
    ];
    // tslint:enable:max-line-length
  }

  onDelete(course: Course): void {
    console.log(course);
  }

}
