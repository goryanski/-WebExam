import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {Observable} from "rxjs";
import {publishReplay, refCount} from "rxjs/operators";
import {CommentInterface} from "../interfaces/comment.interface";
import {ApiResponse} from "../interfaces/api.response.interface";
import {CommentReplyInterface} from "../interfaces/comment-reply.interface";

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


  addComment(text: string, postId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        'add'
      ].join('/'),
      {
        text,
        postId,
        userId
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  getCommentReplies(pageNumber: number, pageSize: number, commentId: number): Observable<CommentReplyInterface[]> {
    return this.httpClient.get<CommentReplyInterface[]>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        `getCommentReplies?PageNumber=${pageNumber}&PageSize=${pageSize}&commentId=${commentId}`
      ].join('/'),
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  addReplyToComment(text: string, commentId: number, ownerId: number, whomName: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        'addReply'
      ].join('/'),
      {
        text,
        commentId,
        ownerId,
        whomName
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  setLikeToComment(commentId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        'setLikeToComment'
      ].join('/'),
      {
        commentId,
        userId
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }

  setLikeToReply(replyId: number, userId: number): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
      [
        this.appEnv.apiPhotoManiaURL,
        'Comments',
        'setLikeToReply'
      ].join('/'),
      {
        replyId,
        userId
      },
      this.options
    ).pipe(
      publishReplay(1),
      refCount()
    );
  }
}
