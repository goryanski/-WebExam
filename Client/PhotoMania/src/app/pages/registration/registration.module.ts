import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class RegistrationModule { }
