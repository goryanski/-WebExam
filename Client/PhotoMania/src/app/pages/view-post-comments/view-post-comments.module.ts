import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostCommentsRoutingModule } from './view-post-comments-routing.module';
import { ViewPostCommentsComponent } from './view-post-comments.component';
import {ComponentsModule} from "../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ViewPostCommentsComponent
  ],
  imports: [
    CommonModule,
    ViewPostCommentsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class ViewPostCommentsModule { }
