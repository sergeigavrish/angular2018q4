import { Course } from '../interfaces/course.interface';

export class CourseEntity implements Course {
  id: string;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;

  constructor(
    id: string,
    title: string,
    creationDate: Date,
    duration: number,
    description: string
  ) {
    this.id = id;
    this.title = title;
    this.creationDate = creationDate;
    this.duration = duration;
    this.description = description;
  }
}