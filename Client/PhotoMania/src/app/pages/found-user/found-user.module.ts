import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundUserRoutingModule } from './found-user-routing.module';
import { FoundUserComponent } from './found-user.component';
import {ComponentsModule} from "../../components/components.module";
import {UserProfileModule} from "../user-profile/user-profile.module";


@NgModule({
  declarations: [
    FoundUserComponent
  ],
  imports: [
    CommonModule,
    FoundUserRoutingModule,
    ComponentsModule,
    UserProfileModule
  ]
})
export class FoundUserModule { }
