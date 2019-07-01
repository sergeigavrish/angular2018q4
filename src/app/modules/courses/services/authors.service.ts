import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { IAuthorResponse } from "../models/interfaces/author.interface";
import { AuthorsRemoteStorageService } from "./authors-remote-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {

  constructor(
    private storage: AuthorsRemoteStorageService
  ) { }

  loadAuthors(): Observable<Array<IAuthorResponse>> {
    return this.storage.loadReq() as Observable<Array<IAuthorResponse>>;
  }

}
