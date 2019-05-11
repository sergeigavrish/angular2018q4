import { AuthState } from "./../../auth/models/interface/auth-state.interface";
import { CoursesState } from "../../courses/models/interfaces/courses-state.interface";

export interface AppState {
  auth: AuthState;
  courses: CoursesState;
}
