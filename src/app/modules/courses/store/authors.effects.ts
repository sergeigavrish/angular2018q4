import { Injectable } from "@angular/core";

import { pipe, of } from "rxjs";
import { switchMap, catchError, map } from "rxjs/operators";

import { Effect, Actions, ofType } from "@ngrx/effects";

import { Author } from "./../models/entity/author.entity";
import { AuthorsService } from "./../services/authors.service";
import { AuthorsActions, AuthorsActionTypes, LoadAuthorsFailed, LoadAuthorsSucceed } from "./authors.actions";
import { AuthorsConverterService } from "../services/authors-converter.service";
import { ConverterService } from "../../shared/services/converter.service";

@Injectable()
export class AuthorsEffects {

  constructor(
    private actions$: Actions<AuthorsActions>,
    private authorsService: AuthorsService,
    private authorConverter: AuthorsConverterService,
    private converter: ConverterService
  ) { }

  @Effect() loadAuthors$ = this.actions$.pipe(
    ofType(AuthorsActionTypes.LoadAuthorsStarted),
    switchMap(() => this.authorsService.loadAuthors().pipe(
      map(data => this.authorConverter.converAuthorResponsToAuthor(data)),
      map(this.converter.arrayToIndexedObject),
      this.handleResponsePipe(
        LoadAuthorsSucceed,
        LoadAuthorsFailed,
        Author.isIndexedObjectOfAuthors
      ),
      this.handleErrorPipe(LoadAuthorsFailed)
    )
    )
  );

  private handleErrorPipe(failed: new () => any) {
    return pipe(
      catchError(error => {
        console.warn(error);
        return of(new failed);
      })
    );
  }

  private handleResponsePipe<T>(
    succeed: new (c: T) => any,
    failed: new () => any,
    predicate: (d?: any) => d is T
  ) {
    return pipe(
      map((res: any) => {
        if (predicate(res)) {
          return new succeed(res);
        }
        return new failed;
      })
    );
  }

}
