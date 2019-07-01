import { Action } from "@ngrx/store";

import { UserName } from "../models/interface/user-response.interface";

export enum AuthActionTypes {
  LogIn = "[Auth] LogIn",
  UserInfo = "[Auth] UserInfo",
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LogIn;
  constructor(public payload: boolean) { }
}

export class UserInfo implements Action {
  readonly type = AuthActionTypes.UserInfo;
  constructor(public payload: UserName) { }
}

export type AuthActions = LogIn | UserInfo;
