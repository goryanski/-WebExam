import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

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
    private readonly localStorage: BrowserLocalStorage
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
      // 1. create new table with liked posts
      // 2. check if this user(id = userId) hasn't already liked this post (id=postId)
      // 3. change likes count in post with id = postId


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
}
