import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {ComponentsModule} from "../../components/components.module";
import {UserProfileService} from "./user-profile.service";


@NgModule({
  declarations: [
    UserProfileComponent
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
