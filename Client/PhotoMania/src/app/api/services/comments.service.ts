import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {Observable} from "rxjs";
import {PostInterface} from "../interfaces/post.interface";
import {publishReplay, refCount} from "rxjs/operators";
import {CommentInterface} from "../interfaces/comment.interface";

@Injectable()
export class CommentsService {
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

  getPostComments(pageNumber: number, pageSize: number, postId: number): Observable<CommentInterface[]> {
    return this.httpClient.get<CommentInterface[]>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        `getComments?PageNumber=${pageNumber}&PageSize=${pageSize}&postId=${postId}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
