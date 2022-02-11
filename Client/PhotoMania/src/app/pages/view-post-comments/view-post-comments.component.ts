import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostsApiService} from "../../api/services/posts.service";
import {take} from "rxjs/operators";
import {PostInterface} from "../../api/interfaces/post.interface";

@Component({
  selector: 'app-view-post-comments',
  templateUrl: './view-post-comments.component.html',
  styleUrls: ['./view-post-comments.component.scss']
})
export class ViewPostCommentsComponent implements OnInit {
  postId: number = 0;
  post: PostInterface = {
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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsApiService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postId = params.id;
      this.postsService.getPostById(this.postId)
        .pipe(take(1))
        .subscribe(res => {
          //console.log('ViewPostCommentsComponent res: ', res);
          this.post = res;
        });
    });
  }

}
