import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommentInterface} from "../../../api/interfaces/comment.interface";
import {CommentReplyInterface} from "../../../api/interfaces/comment-reply.interface";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {CommentsService} from "../../../api/services/comments.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  repliesToShow: CommentReplyInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  showNextRepliesButton: boolean = false;
  @Input() comment: CommentInterface = {
    id: 0,
    text: '',
    date: '',
    likesCount: 0,
    postId: 0,
    ownerId: 0,
    ownerName: '',
    repliesCount: 0,
    replies: [] // remove?
  };
  @ViewChild('username') username: ElementRef | undefined;

  constructor(
    private readonly router: Router,
    private readonly commentsService: CommentsService
  ) { }

  ngOnInit(): void {
  }


  usernameClick() {
    if(this.username != undefined) {
      let text: string = this.username.nativeElement.innerText;
      if(text != '') {
        this.router.navigate([`found-user/${text}`]);
      }
    }
  }

  likeClick() {

  }

  replyClick() {

  }

  watchCommentRepliesClick() {
    this.commentsService.getCommentReplies(this.pageNumber, this.pageSize, this.comment.id)
      .pipe(take(1))
      .subscribe(res => {
        this.showNextRepliesButton = res.length == this.pageSize;
        this.repliesToShow.push(...res);
        this.pageNumber++;
      });
  }
}
