import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ComponentsModule} from "./components/components.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserLocalStorage} from "./shared/storage/local-storage";
import {AppEnvironment} from "./shared/app-environment.interface";
import {environment} from "../environments/environment";
import {QueryHttpInterceptor} from "./shared/http-interceptors/query-http.interceptor";
import {ApiServicesModule} from "./api/services-api.module";
import {AuthHelper} from "./shared/helpers/auth-helper";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    ApiServicesModule
  ],
  providers: [
    AuthHelper,
    BrowserLocalStorage,
    {
      provide: AppEnvironment,
      useValue: environment
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: QueryHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
