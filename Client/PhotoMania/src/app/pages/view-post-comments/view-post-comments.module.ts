import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPostCommentsRoutingModule } from './view-post-comments-routing.module';
import { ViewPostCommentsComponent } from './view-post-comments.component';
import {ComponentsModule} from "../../components/components.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CommentComponent} from "./comment/comment.component";
import {CommentReplyComponent} from "./comment-reply/comment-reply.component";
import { TextFieldComponent } from './text-field/text-field.component';


@NgModule({
  declarations: [
    ViewPostCommentsComponent,
    CommentComponent,
    CommentReplyComponent,
    TextFieldComponent
  ],
  imports: [
    CommonModule,
    ViewPostCommentsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ]
})
export class ViewPostCommentsModule { }
