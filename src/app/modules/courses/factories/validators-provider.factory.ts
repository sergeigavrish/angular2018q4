import { Type, forwardRef, StaticProvider } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";

export function validatorsProviderFactory<T>(c: Type<T>): StaticProvider {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => c),
    multi: true
  };
}
