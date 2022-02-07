import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundPostsRoutingModule } from './found-posts-routing.module';
import { FoundPostsComponent } from './found-posts.component';


@NgModule({
  declarations: [
    FoundPostsComponent
  ],
  imports: [
    CommonModule,
    FoundPostsRoutingModule
  ]
})
export class FoundPostsModule { }
