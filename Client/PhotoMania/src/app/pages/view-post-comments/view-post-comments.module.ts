import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostCommentsRoutingModule } from './view-post-comments-routing.module';
import { ViewPostCommentsComponent } from './view-post-comments.component';
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    ViewPostCommentsComponent
  ],
  imports: [
    CommonModule,
    ViewPostCommentsRoutingModule,
    ComponentsModule
  ]
})
export class ViewPostCommentsModule { }
