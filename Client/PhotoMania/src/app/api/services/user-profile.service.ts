import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Observable} from "rxjs";
import {PostInterface} from "../interfaces/post.interface";
import {publishReplay, refCount} from "rxjs/operators";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {UserInterface} from "../interfaces/user.interface";
import {ApiResponse} from "../interfaces/api.response.interface";

@Injectable()
export class UserProfileApiService {
  readonly options = {
    headers: {
      'Authorization': `Bearer ${this.browserLocalStorage.getItem('accessToken')}`
    }
  };
  constructor(
    private readonly httpClient: HttpClient,
    private readonly appEnv: AppEnvironment,
    private readonly browserLocalStorage: BrowserLocalStorage
  ) {
  }

  getNextPosts(pageNumber: number, pageSize: number, route: string, userId: number): Observable<PostInterface[]> {
    return this.httpClient.get<PostInterface[]>(
      [
        this.appEnv.apiPhotoManiaURL,
        'UserProfile',
        `${route}?PageNumber=${pageNumber}&PageSize=${pageSize}&userId=${userId}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  editUserPersonalInfo(user: UserInterface): Observable<ApiResponse> {
    console.log('UserProfileApiService user: ', user)
    return this.httpClient.put<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'UserProfile',
        'update'
      ].join('/'),
      user,
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
