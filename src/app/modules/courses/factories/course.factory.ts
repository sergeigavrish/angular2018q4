import { CourseEntity } from "./../models/entity/course.entity";
import { ICourseEntity } from "../models/interfaces/course-entity.interface";

export const courseFactory = (data: ICourseEntity) => new CourseEntity(
  data.id,
  data.name,
  new Date(data.date),
  data.length,
  data.description,
  data.image,
  data.topRated,
  data.authors
);
