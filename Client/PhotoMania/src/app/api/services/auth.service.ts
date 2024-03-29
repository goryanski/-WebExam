import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {publishReplay, refCount} from "rxjs/operators";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {JwtResponse} from "../interfaces/jwt-response.interface";
import {ApiResponse} from "../interfaces/api.response.interface";


@Injectable()
export class AuthApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly appEnv: AppEnvironment
  ) { }

  login(login: string, password: string): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'auth',
        'login'
      ].join('/'),
      {
        login,
        password
      },
      {
        headers: {
          'Authorization': 'Bearer token'
        }
      }
    ).pipe(
      publishReplay(1),
      refCount()
    )
  }



  registration(
    login: string, password: string, email: string, description: string, avatarPath: string
  ) : Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'auth',
        'registration'
      ].join('/'),
      {
        login,
        password,
        email,
        description,
        avatarPath
      },
      {
        headers: {
          'Authorization': 'Bearer token'
        }
      }
    ).pipe(
      publishReplay(1),
      refCount()
    )
  }
}
