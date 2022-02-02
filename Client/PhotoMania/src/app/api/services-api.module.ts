import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {HomeService} from "./services/home.service";
import {AuthApiService} from "./services/auth.service";
import {UploadService} from "./services/upload.service";

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  providers: [
    HomeService,
    AuthApiService,
    UploadService
  ]
})
export class ApiServicesModule { }
