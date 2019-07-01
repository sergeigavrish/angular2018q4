import { Pipe, PipeTransform } from "@angular/core";

import { ConverterService } from "./../services/converter.service";
import { IndexedObject } from "../models/interfaces/indexed-object.interface";

@Pipe({
  name: "indexedObjectToArray"
})
export class IndexedObjectToArrayPipe implements PipeTransform {

  constructor(private converter: ConverterService) { }

  transform(data: Array<IndexedObject<any>>): Array<any> {
    return this.converter.indexedObjectToArray(data);
  }

}
