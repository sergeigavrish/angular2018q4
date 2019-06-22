import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlightMatching"
})
export class HighlightMatchingPipe implements PipeTransform {

  transform(value: string, match: string): any {
    const startIndex = value.toLowerCase().indexOf(match.toLowerCase());
    if (startIndex !== -1) {
      const endLength = match.length;
      const matchingString = value.substr(startIndex, endLength);
      return value.replace(matchingString, "<b>" + matchingString + "</b>");
    }
    return null;
  }
}
