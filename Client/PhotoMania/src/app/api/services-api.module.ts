import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./services/home.service";
import {LoginApiService} from "./services/login.service";
import {UploadService} from "./services/upload.service";

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    HomeService,
    LoginApiService,
    UploadService
  ]
})
export class ApiServicesModule { }
