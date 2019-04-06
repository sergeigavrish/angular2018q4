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
    && userRes.hasOwnProperty("id")
    && userRes.hasOwnProperty("name")
    && userRes.name
    && userRes.name.hasOwnProperty("first")
    && userRes.name.hasOwnProperty("last");
};
