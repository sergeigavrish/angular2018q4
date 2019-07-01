import { IAuthor } from "./author.interface";
import { IndexedObject } from "../../../shared/models/interfaces/indexed-object.interface";
import { ReqStatus } from "../../../shared/types";

export interface IAuthorsState {
  authors: IndexedObject<IAuthor>;
  loading: ReqStatus;
}
