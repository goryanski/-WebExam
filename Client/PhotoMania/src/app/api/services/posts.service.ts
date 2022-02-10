import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Observable} from "rxjs";
import {PostInterface} from "../interfaces/post.interface";
import {publishReplay, refCount} from "rxjs/operators";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {ApiResponse} from "../interfaces/api.response.interface";

@Injectable()
export class PostsApiService {
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

  getNextPosts(pageNumber: number, pageSize: number, searchKey: string): Observable<PostInterface[]> {
    return this.httpClient.get<PostInterface[]>(
      [
        this.appEnv.apiPhotoManiaURL,
        `Posts?PageNumber=${pageNumber}&PageSize=${pageSize}&searchKey=${searchKey}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  SetLikeDislike(whatToSet: string, postId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Posts',
        `${whatToSet}`
      ].join('/'),
      {
        postId,
        userId
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  createPost(description: string, dbPath: string, userId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Posts',
        'create'
      ].join('/'),
      {
        description,
        dbPath,
        userId
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
