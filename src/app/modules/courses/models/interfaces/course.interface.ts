export interface Course {
  id: string;
  name: string;
  date: Date;
  length: number;
  description: string;
  topRated?: boolean;
  image: string;
}
