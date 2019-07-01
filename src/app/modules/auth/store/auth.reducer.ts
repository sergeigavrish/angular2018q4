import { AuthActionTypes, LogIn, AuthActions, UserInfo } from "./auth.actions";
import { AuthState } from "../models/interface/auth-state.interface";

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  userInfo: { first: "", last: "" }
};

const handleLogin = (state: AuthState, action: LogIn) => {
  return {
    ...state,
    isAuthenticated: action.payload
  };
};

const handleUserInfo = (state: AuthState, action: UserInfo) => {
  return {
    ...state,
    userInfo: action.payload
  };
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LogIn:
      return handleLogin(state, action);
    case AuthActionTypes.UserInfo:
      return handleUserInfo(state, action);
    default:
      return state;
  }
}
