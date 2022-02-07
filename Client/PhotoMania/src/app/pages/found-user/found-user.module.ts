import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundUserRoutingModule } from './found-user-routing.module';
import { FoundUserComponent } from './found-user.component';


@NgModule({
  declarations: [
    FoundUserComponent
  ],
  imports: [
    CommonModule,
    FoundUserRoutingModule
  ]
})
export class FoundUserModule { }
