import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundPostsRoutingModule } from './found-posts-routing.module';
import { FoundPostsComponent } from './found-posts.component';
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    FoundPostsComponent
  ],
  imports: [
    CommonModule,
    FoundPostsRoutingModule,
    ComponentsModule
  ]
})
export class FoundPostsModule { }
