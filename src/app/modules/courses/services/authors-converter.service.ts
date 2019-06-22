import { Injectable } from "@angular/core";

import { AuthorFactory } from "../factories/author.factory";
import { IAuthorResponse, IAuthor, isIAuthorResponse } from "../models/interfaces/author.interface";

@Injectable({
  providedIn: "root"
})
export class AuthorsConverterService {

  constructor() { }

  converAuthorResponsToAuthor(data: Array<IAuthorResponse>): Array<IAuthor> {
    return Array.isArray(data) ? data.reduce((acc, a) => {
      if (isIAuthorResponse(a)) {
        const [firstName, lastName] = this.splitString(a.name, " ");
        const author: IAuthor = AuthorFactory({ id: a.id, firstName, lastName });
        return acc.concat(author);
      }
      return acc;
    }, []) : [];
  }

  private splitString(str: string, key: string): Array<string> {
    return str && str.split(key);
  }

}
