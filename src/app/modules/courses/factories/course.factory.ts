import { Course } from "./../models/interfaces/course.interface";
import { CourseEntity } from "./../models/entity/course.entity";

export const courseFactory = (data: Course) => new CourseEntity(
  data.id,
  data.title,
  new Date(data.creationDate),
  data.duration,
  data.description,
  data.topRated,
  data.image
);
