import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {PostsApiService} from "../../api/services/posts.service";
import {take, tap} from "rxjs/operators";

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
    commentsCount: 0,
    userId: 0
  };
  apiStaticFilesURL: string = '';
  currentUserId: number = 0;
  @ViewChild('username') username: ElementRef | undefined;
  @ViewChild('postId') postId: ElementRef | undefined;
  @ViewChild('ownerId') postOwnerId: ElementRef | undefined;
  @ViewChild('like') like: ElementRef | undefined;
  @ViewChild('dislike') dislike: ElementRef | undefined;
  @ViewChild('errorLabel') errorLabel: ElementRef | undefined;


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
      this.postsService.SetLikeDislike('setLike', this.getPostId(), this.currentUserId)
        .pipe(take(1))
        .subscribe(res => {
            if(res.response === 'ok') {
              // display increasing likes number
              if(this.like?.nativeElement.innerText != undefined) {
                let countLikes: number = parseInt(this.like?.nativeElement.innerText);
                this.like.nativeElement.innerText = (++countLikes).toString();
              }
            }
            else {
              // show error
              if(this.errorLabel?.nativeElement.innerText != undefined) {
                this.errorLabel.nativeElement.innerText = "can't like a second time";
              }
            }
          }
        );
    }
    else {
      // show error
      if(this.errorLabel?.nativeElement.innerText != undefined) {
        this.errorLabel.nativeElement.innerText = "can't like your own post";
      }
    }
  }

  dislikeClick() {
    if(this.canClick()) {
      this.postsService.SetLikeDislike('setDislike', this.getPostId(), this.currentUserId)
        .pipe(take(1))
        .subscribe(res => {
          if(res.response === 'ok') {
            // display increasing dislikes number
            if(this.dislike?.nativeElement.innerText != undefined) {
              let countDislikes: number = parseInt(this.dislike?.nativeElement.innerText);
              this.dislike.nativeElement.innerText = (++countDislikes).toString();
            }
          }
          else {
            if(this.errorLabel?.nativeElement.innerText != undefined) {
              this.errorLabel.nativeElement.innerText = "can't dislike a second time";
            }
          }
        });
    }
    else {
      if(this.errorLabel?.nativeElement.innerText != undefined) {
        this.errorLabel.nativeElement.innerText = "can't dislike your own post";
      }
    }
  }

  private canClick() {
    let ownerId: number = this.postOwnerId?.nativeElement.value;
    return this.currentUserId != 0 && this.currentUserId != ownerId;
  }

  private getPostId(): number {
    return this.postId?.nativeElement.value;
  }

  clickByComments() {
    if(this.postId != undefined) {
      let id: number = this.postId.nativeElement.value;
      this.router.navigate([`view-post-comments/${id}`]);
    }
  }
}
