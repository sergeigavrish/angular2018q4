import { InjectionToken, ValueProvider } from "@angular/core";

export const BORDER_COLOR_TOKEN = new InjectionToken("BORDER_COLOR_TOKEN");

export enum borderColorClasses {
    new = "new",
    upcoming = "upcoming",
}

export const borderColorProvider: ValueProvider = { provide: BORDER_COLOR_TOKEN, useValue: borderColorClasses };
