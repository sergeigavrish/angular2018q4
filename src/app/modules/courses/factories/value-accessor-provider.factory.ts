import { Type, forwardRef, StaticProvider } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

export function valueAccessorProviderFactory<T>(c: Type<T>): StaticProvider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => c),
    multi: true
  };
}
