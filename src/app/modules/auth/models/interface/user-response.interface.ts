import { checkStringProp } from "../../../../helpers/type-guard-helpers";

export interface UserResponse {
  id: string | number;
  name: UserName;
}

export interface UserName {
  first: string;
  last: string;
}

export const isUserResponse = (data: Object | UserResponse): data is UserResponse => {
  const userRes = data as UserResponse;
  return userRes
    && checkStringProp<UserResponse>(userRes, "id")
    && userRes.hasOwnProperty("name")
    && userRes.name
    && checkStringProp<UserResponse>(userRes, "first")
    && checkStringProp<UserResponse>(userRes, "last");
};
