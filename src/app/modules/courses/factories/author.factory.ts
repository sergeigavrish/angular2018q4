import { Author } from "./../models/entity/author.entity";
import { IAuthor } from "../models/interfaces/author.interface";

export const AuthorFactory = (data: IAuthor) => new Author(data.id, data.firstName, data.lastName);
