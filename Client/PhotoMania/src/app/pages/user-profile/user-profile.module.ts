import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {ComponentsModule} from "../../components/components.module";
import { UserPostsComponent } from '../../components/user-posts/user-posts.component';
import { UserFavoritesPostsComponent } from './user-favorites-posts/user-favorites-posts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreatePostComponent } from './create-post/create-post.component';


@NgModule({
    declarations: [
        UserProfileComponent,
        UserPostsComponent,
        UserFavoritesPostsComponent,
        EditProfileComponent,
        CreatePostComponent
    ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        ComponentsModule
    ],
    providers: [

    ],
    exports: [
        UserPostsComponent
    ]
})
export class UserProfileModule { }
