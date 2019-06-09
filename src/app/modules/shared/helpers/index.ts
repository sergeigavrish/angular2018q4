import { IndexedValue } from "../models/interfaces/indexed-value.interface";
import { IndexedObject } from "../models/interfaces/indexed-object.interface";

export const arrayToIndexedObject = function <T extends IndexedValue>(array: Array<T>, acc = {}): IndexedObject<T> {
  return array.reduce((accumulator: { [id: string]: T }, item: T) => {
    return {
      ...accumulator,
      [item.id]: item
    };
  }, {});
};


export const indexedObjectToArray = function <T extends IndexedValue>(object: IndexedObject<T>): Array<T> {
  return Object.keys(object).map(id => object[id]);
};
