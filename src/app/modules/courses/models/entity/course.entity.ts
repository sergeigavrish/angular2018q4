import { Course } from "../interfaces/course.interface";

export class CourseEntity implements Course {
  constructor(
    public id: string,
    public title: string,
    public creationDate: Date,
    public duration: number,
    public description: string
  ) { }
}
