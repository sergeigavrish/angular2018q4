import { ValueProvider, InjectionToken } from "@angular/core";

export const INTERCEPTION_URLS_TOKEN = new InjectionToken<Array<string>>("INTERCEPTION_URLS_TOKEN");

const InterceptionUrl = ["userinfo"];

export const InterceptionUrlProvder: ValueProvider = {
  provide: INTERCEPTION_URLS_TOKEN,
  useValue: InterceptionUrl
};
