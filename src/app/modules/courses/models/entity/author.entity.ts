import { IAuthor } from "../interfaces/author.interface";
import { IndexedObject } from "../../../shared/models/interfaces/indexed-object.interface";
import { checkStringProp } from "../../../../helpers/type-guard-helpers";

export class Author implements IAuthor {
  constructor(
    public id: string,
    public firstName: string,
    public lastName: string
  ) { }

  static isAuthor(data: Object | IAuthor): data is IAuthor {
    const author = data as IAuthor;
    return author
      && checkStringProp(author, "id")
      && checkStringProp(author, "firstName")
      && checkStringProp(author, "lastName");
  }

  static isArrayOfAuthors(data: Array<any> | Array<IAuthor>): data is Array<IAuthor> {
    const authors = data as Array<IAuthor>;
    return Array.isArray(authors) && authors.every(Author.isAuthor);
  }

  static isIndexedObjectOfAuthors(data: IndexedObject<any> | IndexedObject<IAuthor>): data is IndexedObject<IAuthor> {
    const authors = data as IndexedObject<IAuthor>;
    return authors && Object.keys(authors).every(k => Author.isAuthor(authors[k]));
  }

}
