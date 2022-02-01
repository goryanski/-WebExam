import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {PostInterface} from "../interfaces/post.interface";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class UploadService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appEnv: AppEnvironment
  ) {
  }

  //uploadImage()
  uploadImage(formData: FormData, param2: { reportProgress: boolean; observe: string }, imgFolder: string) {
    return this.httpClient.post(
      [
        this.appEnv.apiPhotoManiaURL,
        `upload?imgFolder=${imgFolder}`
      ].join('/'),
      formData,
      {reportProgress: true, observe: 'events'}
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
