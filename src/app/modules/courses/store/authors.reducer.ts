import { AuthorsActionTypes, LoadAuthorsSucceed } from "./authors.actions";
import { ReqStatus } from "./../../shared/types/index";
import { IAuthorsState } from "../models/interfaces/authors-state.interface";
import { AuthorsActions } from "./authors.actions";

const initialState: IAuthorsState = {
  authors: {},
  loading: ReqStatus.empty
};

const handleGetAuthors = (state: IAuthorsState, action: LoadAuthorsSucceed): IAuthorsState => {
  return {
    ...state,
    loading: ReqStatus.success,
    authors: action.payload
  };
};

const handleLoadStarted = (state: IAuthorsState) => {
  return {
    ...state,
    loading: ReqStatus.pending
  };
};

const handleFailed = (state: IAuthorsState) => {
  return {
    ...state,
    loading: ReqStatus.error
  };
};

export function authorsReducer(state = initialState, action: AuthorsActions): IAuthorsState {
  switch (action.type) {
    case AuthorsActionTypes.LoadAuthorsStarted:
      return handleLoadStarted(state);
    case AuthorsActionTypes.LoadAuthorsSucceed:
      return handleGetAuthors(state, action);
    case AuthorsActionTypes.LoadAuthorsFailed:
      return handleFailed(state);
    default:
      return state;
  }
}
