import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/interfaces/course.interface';
import { CourseEntity } from '../../models/entity/course.entity';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  courses: Course[];

  constructor() { }

  ngOnInit() {
    this.courses = [
      new CourseEntity('1', 'Title 1', new Date(), 1, 'first'),
      new CourseEntity('2', 'Title 2', new Date(), 1, 'second'),
    ];
  }

}
