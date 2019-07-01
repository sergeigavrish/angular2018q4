import { IAuthor } from "./author.interface";

export interface Course {
  name: string;
  date: Date;
  length: number;
  description: string;
  image: string;
  topRated: boolean;
  authors: Array<IAuthor>;
}
