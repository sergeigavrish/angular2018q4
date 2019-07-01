import { Injectable } from "@angular/core";

import { IndexedValue } from "../models/interfaces/indexed-value.interface";
import { IndexedObject } from "../models/interfaces/indexed-object.interface";

@Injectable({
  providedIn: "root"
})
export class ConverterService {

  constructor() { }

  arrayToIndexedObject<T extends IndexedValue>(array: Array<T>, acc = {}): IndexedObject<T> {
    return array.reduce((accumulator: { [id: string]: T }, item: T) => {
      return {
        ...accumulator,
        [item.id]: item
      };
    }, {});
  }

  indexedObjectToArray<T extends IndexedValue>(object: IndexedObject<T>): Array<T> {
    return Object.keys(object).map(id => object[id]);
  }

}
