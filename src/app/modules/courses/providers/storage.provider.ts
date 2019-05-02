import { InjectionToken, ClassProvider } from "@angular/core";
import { CoursesRemoteStorageService } from "../services/courses-remote-storage.service";

export const STORAGE_TOKEN = new InjectionToken("STORAGE_TOKEN");

export const StorageProvider: ClassProvider = {
    provide: STORAGE_TOKEN,
    useClass: CoursesRemoteStorageService,
};
