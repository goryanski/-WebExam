import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import { PostComponent } from './post/post.component';
import { UploadComponent } from './upload/upload.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import {ReactiveFormsModule} from "@angular/forms";
import { UserProfileCardComponent } from './user-profile-card/user-profile-card.component';


// common components
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PostComponent,
    UploadComponent,
    ModalWindowComponent,
    UserProfileCardComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PostComponent,
    UploadComponent,
    ModalWindowComponent,
    UserProfileCardComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
