import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsApiService} from "../../api/services/posts.service";
import {take} from "rxjs/operators";
import {PostInterface} from "../../api/interfaces/post.interface";
import {CommentsService} from "../../api/services/comments.service";
import {CommentInterface} from "../../api/interfaces/comment.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-view-post-comments',
  templateUrl: './view-post-comments.component.html',
  styleUrls: ['./view-post-comments.component.scss']
})
export class ViewPostCommentsComponent implements OnInit {
  postId: number = 0;
  currentUserId: number = 0;
  commentsToShow: CommentInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  public modalWindowData: any;
  post: PostInterface = {
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
  showNextCommentsButton: boolean = false;


  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsApiService,
    private readonly commentsService: CommentsService,

    private readonly localStorage: BrowserLocalStorage
  ) {
    this.currentUserId = this.localStorage.getCurrentUserId();
  }

  ngOnInit(): void {
    // take post id from route params, get post from api and display it
    this.activatedRoute.params.subscribe(params => {
      this.postId = params.id;
      this.postsService.getPostById(this.postId)
        .pipe(take(1))
        .subscribe(res => {
          this.post = res;

          // if there are comments for this post - take it from api and display it as well
          if(this.post.commentsCount != 0) {
            this.showNextComments();
          }
          else {
            console.log('this.post.commentsCount = 0');
          }
        });
    });
  }

  showNextComments() {
    this.commentsService.getPostComments(this.pageNumber, this.pageSize, this.post.id)
      .pipe(take(1))
      .subscribe(res => {
        // do check if we take as many comments as page size. if true - show button "get next comments", otherwise - hide this button
        this.showNextCommentsButton = res.length == this.pageSize;
        this.commentsToShow.push(...res);
        this.pageNumber++;
      });
  }


  showNextCommentsClick() {
    this.showNextComments();
  }

  addCommentEvent(response: string) {
    if(response == "ok") {
      // if showNextCommentsButton was clicked we need to reload comments list to update it, otherwise user will update comments list and see a new comment when he clicks on showNextCommentsButton ()
      if(!this.showNextCommentsButton) {
        // reload comments array with a new comment, so user will see like comment simply  adding to the bottom
        this.commentsToShow = [];
        this.pageNumber = 1;
        this.showNextComments();
      }
    }
    else {
      this.modalWindowData = {
        title: 'Error!',
        message: response
      }
    }
  }

  addCommentReplayResponseEvent(response: string) {
    console.log('ViewPostCommentsComponent addCommentReplayResponseEvent response: ', response)
  }
}
