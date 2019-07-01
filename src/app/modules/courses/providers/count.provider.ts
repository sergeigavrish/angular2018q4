import { InjectionToken, ValueProvider } from "@angular/core";

export const COUNT_VALUE = 6;

export const COUNT_TOKEN = new InjectionToken("COUNT_TOKEN");

export const CountProvider: ValueProvider = {
    provide: COUNT_TOKEN,
    useValue: COUNT_VALUE,
};
