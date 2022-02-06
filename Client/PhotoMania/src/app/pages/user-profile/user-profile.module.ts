import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {ComponentsModule} from "../../components/components.module";
import {UserProfileService} from "./user-profile.service";
import { UserPostsComponent } from './user-posts/user-posts.component';
import { UserFavoritesPostsComponent } from './user-favorites-posts/user-favorites-posts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserPostsComponent,
    UserFavoritesPostsComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ComponentsModule
  ],
  providers: [
    UserProfileService
  ],
})
export class UserProfileModule { }
