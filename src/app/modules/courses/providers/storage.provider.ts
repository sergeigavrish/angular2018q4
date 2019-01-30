import { InjectionToken, ClassProvider } from "@angular/core";
import { MockStorageService } from "../services/mock-storage.service";

export const STORAGE_TOKEN = new InjectionToken("STORAGE_TOKEN");

export const StorageProvider: ClassProvider = {
    provide: STORAGE_TOKEN,
    useClass: MockStorageService,
};
