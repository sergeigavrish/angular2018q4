export interface LoginResponse {
  token: string;
}

export const isLoginResponse = (res: Object | LoginResponse): res is LoginResponse => {
  const loginResponse = res as LoginResponse;
  return loginResponse.hasOwnProperty("token")
    && typeof loginResponse.token === "string"
    && !!loginResponse.token;
};
