import { Course } from "../interfaces/course.interface";

export class CourseEntity implements Course {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public length: number,
    public description: string,
    public image: string,
    public topRated: boolean = false
  ) { }

  static isCourse(course: Object | Course): course is Course {
    const c = course as Course;
    return c.hasOwnProperty("name") && typeof c.name === "string" && c.name.length
      && c.hasOwnProperty("date") && !isNaN(new Date(c.date) as any)
      && c.hasOwnProperty("length") && c.length > 0 && !isNaN(c.length)
      && c.hasOwnProperty("description") && typeof (c.description) === "string"
      && c.hasOwnProperty("topRated") && typeof (c.topRated) === "boolean";
  }
}
