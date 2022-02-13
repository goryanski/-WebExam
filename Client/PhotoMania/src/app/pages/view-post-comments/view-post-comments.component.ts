import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsApiService} from "../../api/services/posts.service";
import {take} from "rxjs/operators";
import {PostInterface} from "../../api/interfaces/post.interface";
import {CommentsService} from "../../api/services/comments.service";
import {CommentInterface} from "../../api/interfaces/comment.interface";

@Component({
  selector: 'app-view-post-comments',
  templateUrl: './view-post-comments.component.html',
  styleUrls: ['./view-post-comments.component.scss']
})
export class ViewPostCommentsComponent implements OnInit {
  postId: number = 0;
  commentsToShow: CommentInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 20;
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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsApiService,
    private readonly commentsService: CommentsService,
  ) { }

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
        console.log('ViewPostCommentsComponent res: ', res);
        // do check if we take (commentsCount == this.pageSize) if true - show button "get next comments", otherwise - hide this button
        this.commentsToShow.push(...res)
        this.pageNumber++;
      });
  }

  sendClick() {

  }
}
