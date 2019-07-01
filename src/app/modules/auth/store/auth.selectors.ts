import { createFeatureSelector, createSelector } from "@ngrx/store";

import { AuthState } from "../models/interface/auth-state.interface";

const selectAuthState = createFeatureSelector<AuthState>("auth");

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated
);

export const selectUserInfo = createSelector(
  selectAuthState,
  state => state.userInfo
);
