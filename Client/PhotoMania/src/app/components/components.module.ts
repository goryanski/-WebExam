import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { PostComponent } from './post/post.component';
import { UploadComponent } from './upload/upload.component';


// common components
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PostComponent,
    UploadComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PostComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
