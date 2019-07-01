import { IAuthorsState } from "./../models/interfaces/authors-state.interface";

import { createFeatureSelector, createSelector } from "@ngrx/store";

const selectAuthorsState = createFeatureSelector<IAuthorsState>("authors");

export const selectAuthors = createSelector(
  selectAuthorsState,
  state => state.authors
);
