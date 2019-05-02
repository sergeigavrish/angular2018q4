import { Course } from "./../models/interfaces/course.interface";
import { CourseEntity } from "./../models/entity/course.entity";

export const courseFactory = (data: Course) => new CourseEntity(
  data.id,
  data.name,
  new Date(data.date),
  data.length,
  data.description,
  data.image,
  data.topRated
);
