import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FoundPostsComponent} from "./found-posts.component";

const routes: Routes = [
  {
    path: '',
    component: FoundPostsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundPostsRoutingModule { }
