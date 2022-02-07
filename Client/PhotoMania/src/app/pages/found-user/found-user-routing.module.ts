import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FoundUserComponent} from "./found-user.component";

const routes: Routes = [
  {
    path: '',
    component: FoundUserComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundUserRoutingModule { }
