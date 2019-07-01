import { checkStringProp } from "../../../../helpers/type-guard-helpers";

export interface IAuthor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface IAuthorResponse {
  id: string;
  name: string;
}

export const isIAuthorResponse = (data: Object | IAuthorResponse): data is IAuthorResponse => {
  const authorRes = data as IAuthorResponse;
  return authorRes
    && checkStringProp<IAuthorResponse>(authorRes, "id")
    && checkStringProp<IAuthorResponse>(authorRes, "name");
};

export const isArrayIAuthorResponse = (data: Array<any> | Array<IAuthorResponse>): data is Array<IAuthorResponse> => {
  const authors = data as Array<IAuthorResponse>;
  return Array.isArray(authors) && authors.every(isIAuthorResponse);
};

