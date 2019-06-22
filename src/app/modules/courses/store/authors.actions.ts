import { Action } from "@ngrx/store";

import { IAuthor } from "../models/interfaces/author.interface";
import { IndexedObject } from "../../shared/models/interfaces/indexed-object.interface";

export enum AuthorsActionTypes {
  LoadAuthorsStarted = "[Authors] LoadAuthorsStarted",
  LoadAuthorsSucceed = "[Courses] LoadAuthorsSucceed",
  LoadAuthorsFailed = "[Courses] LoadAuthorsFailed",
}

export class LoadAuthorsStarted implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsStarted;
}

export class LoadAuthorsSucceed implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsSucceed;
  constructor(public payload: IndexedObject<IAuthor>) { }
}

export class LoadAuthorsFailed implements Action {
  readonly type = AuthorsActionTypes.LoadAuthorsFailed;
}

export type AuthorsActions = LoadAuthorsStarted | LoadAuthorsSucceed | LoadAuthorsFailed;
