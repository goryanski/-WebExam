import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {PostsApiService} from "../../api/services/posts.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostInterface = {
    id: 0,
    photoPath: '',
    description: '',
    date: '',
    likesCount: 0,
    dislikesCount: 0,
    username: '',
    commentsCount: '',
    userId: 0
  };
  apiStaticFilesURL = '';
  currentUserId: number = 0;
  @ViewChild('username') username: ElementRef | undefined;
  @ViewChild('postId') postId: ElementRef | undefined;
  @ViewChild('ownerId') postOwnerId: ElementRef | undefined;
  @ViewChild('like') like: ElementRef | undefined;
  @ViewChild('dislike') dislike: ElementRef | undefined;


  constructor(
    private readonly appEnv: AppEnvironment,
    private readonly router: Router,
    private readonly localStorage: BrowserLocalStorage,
    private readonly postsService: PostsApiService
  ) {
    this.apiStaticFilesURL = appEnv.apiStaticFilesURL;
    this.currentUserId = this.localStorage.getCurrentUserId();
  }

  ngOnInit(): void {
  }

  clickByUsername() {
    if(this.username != undefined) {
      let text: string = this.username.nativeElement.innerText;
      if(text != '') {
        this.router.navigate([`found-user/${text}`]);
      }
    }
  }

  likeClick() {
    if(this.canClick()) {
      // send query to api for change likes count
      // params: postId, userId(from storage)
      // in api:
      // 2. check if this user(id = userId) hasn't already liked this post (id=postId)
      // 3. change likes count in post with id = postId

      // this.postsService.SetLike(this.getPostId(), this.currentUserId)
      //   .pipe(take(1))
      //   .subscribe(res => {
      //     console.log("this.postsService.SetLike res: ", res);
      //   });

      // after checking increase likes number
      let countLikes: number = parseInt(this.like?.nativeElement.innerText);
      if(this.like?.nativeElement.innerText != undefined) {
        this.like.nativeElement.innerText = (++countLikes).toString();
      }
    }
  }

  dislikeClick() {
    if(this.canClick()) {

    }
  }

  private canClick() {
    let ownerId: number = this.postOwnerId?.nativeElement.value;
    return this.currentUserId != 0 && this.currentUserId != ownerId;
  }

  private getPostId(): number {
    return this.postId?.nativeElement.value;
  }
}
