import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./services/home.service";
import {LoginApiService} from "./services/login.service";

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    HomeService,
    LoginApiService
  ]
})
export class ApiServicesModule { }
