import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PathNotFoundComponent } from "./modules/core/components/path-not-found/path-not-found.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PathNotFoundComponent,
    data: {
      title: "Page Not Found",
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
