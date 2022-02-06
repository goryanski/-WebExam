import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Observable} from "rxjs";
import {PostInterface} from "../interfaces/post.interface";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class UserProfileApiService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appEnv: AppEnvironment
  ) {
  }

  getNextPosts(pageNumber: number, pageSize: number, route: string, userId: number): Observable<PostInterface[]> {
    return this.httpClient.get<PostInterface[]>(
      [
        this.appEnv.apiPhotoManiaURL,
        'UserProfile',
        `${route}?PageNumber=${pageNumber}&PageSize=${pageSize}&userId=${userId}`
      ].join('/')
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
