import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./services/home.service";
import {AuthApiService} from "./services/auth.service";
import {UploadService} from "./services/upload.service";
import {LoadUserDataApiService} from "./services/load-user-data.service";
import {UserProfileApiService} from "./services/user-profile.service";

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    HomeService,
    AuthApiService,
    UploadService,
    LoadUserDataApiService,
    UserProfileApiService
  ]
})
export class ApiServicesModule { }
