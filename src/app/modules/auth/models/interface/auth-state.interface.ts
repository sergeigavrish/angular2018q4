import { UserName } from "./user-response.interface";

export interface AuthState {
  isAuthenticated: boolean;
  userInfo: UserName;
}
