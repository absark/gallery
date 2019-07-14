import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImgComponent } from "./img/img.component";
import { ImgListComponent } from "./img-list/img-list.component";

const routes: Routes = [
  { path: "", redirectTo: "upload", pathMatch: "full" },
  { path: "upload", component: ImgComponent },
  { path: "gallery", component: ImgListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
