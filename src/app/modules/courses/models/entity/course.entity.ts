import { Course } from "../interfaces/course.interface";
import { ICourseEntity } from "../interfaces/course-entity.interface";

export class CourseEntity implements ICourseEntity {
  constructor(
    public id: string,
    public name: string,
    public date: Date,
    public length: number,
    public description: string,
    public image: string,
    public topRated: boolean = false
  ) { }

  static isCourse = (course: Object | Course): course is Course => {
    const c = course as Course;
    return c && c.hasOwnProperty("name") && typeof c.name === "string" && c.name.length
      && c.hasOwnProperty("date") && !isNaN(new Date(c.date) as any)
      && c.hasOwnProperty("length") && c.length > 0 && !isNaN(c.length)
      && c.hasOwnProperty("description") && typeof (c.description) === "string"
      && c.hasOwnProperty("topRated") && typeof (c.topRated) === "boolean";
  }

  static isCourseEntity = (course: Object | ICourseEntity): course is ICourseEntity => {
    const c = course as ICourseEntity;
    return c && c.hasOwnProperty("id") && typeof c.id === "string" && c.id.length
      && CourseEntity.isCourse(c);
  }

  static isArrayOfCourseEntity = (arr: Array<any> | Array<ICourseEntity>): arr is Array<ICourseEntity> => {
    const arrayOfCourse = arr as Array<ICourseEntity>;
    return arrayOfCourse && arrayOfCourse.every(c => CourseEntity.isCourseEntity(c));
  }

}
