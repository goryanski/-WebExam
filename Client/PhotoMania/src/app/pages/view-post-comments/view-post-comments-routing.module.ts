import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ViewPostCommentsComponent} from "./view-post-comments.component";

const routes: Routes = [
  {
    path: '',
    component: ViewPostCommentsComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPostCommentsRoutingModule { }
