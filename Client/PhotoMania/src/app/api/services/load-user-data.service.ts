import {Injectable} from "@angular/core";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtResponse} from "../interfaces/jwt-response.interface";
import {UserProfileCard} from "../interfaces/user-profile-card.interface";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {publishReplay, refCount} from "rxjs/operators";
import {UserInterface} from "../interfaces/user.interface";

@Injectable()
export class LoadUserDataApiService {
  readonly options = {
    headers: {
      'Authorization': `Bearer ${this.browserLocalStorage.getItem('accessToken')}`
    }
  };

  constructor(
    private readonly http: HttpClient,
    private readonly appEnv: AppEnvironment,
    private readonly browserLocalStorage: BrowserLocalStorage
  ) {
  }

  loadUserProfileCardInfo(userId: number): Observable<UserProfileCard> {
    return this.http.get<UserProfileCard>(
      [
        this.appEnv.apiPhotoManiaURL,
        'userInfo',
        `profile?id=${userId}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    )
  }

  getUserIdByName(username: string): Observable<number> {
    return this.http.get<number>(
      [
        this.appEnv.apiPhotoManiaURL,
        'userInfo',
        `getId?username=${username}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    )
  }

  loadGeneralUserData(userId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(
      [
        this.appEnv.apiPhotoManiaURL,
        'userInfo',
        `data?userId=${userId}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    )
  }
}
