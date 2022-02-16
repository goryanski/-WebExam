import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
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
  replyButtonWasClicked: boolean = false;
  watchRepliesButtonWasClicked: boolean = false;
  sendReplyButtonWasClicked: boolean = false;
  public modalWindowData: any;

  @Input() comment: CommentInterface = {
    id: 0,
    text: '',
    date: '',
    likesCount: 0,
    postId: 0,
    ownerId: 0,
    ownerName: '',
    repliesCount: 0,
    replies: []
  };
  @Input() currentUserId: number = 0;
  @ViewChild('username') username: ElementRef | undefined;
  @ViewChild('errorLabel') errorLabel: ElementRef | undefined;
  @ViewChild('commentLike') commentLike: ElementRef | undefined;

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
    if(this.canClick()) {
      this.commentsService.setLikeToComment(this.comment.id, this.currentUserId)
        .pipe(take(1))
        .subscribe(res => {
            if(res.response === 'ok') {
              // display increasing likes number
              if(this.commentLike?.nativeElement.innerText != undefined) {
                let countLikes: number = parseInt(this.commentLike?.nativeElement.innerText);
                this.commentLike.nativeElement.innerText = (++countLikes).toString();
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
        this.errorLabel.nativeElement.innerText = "can't like your own comment";
      }
    }
  }

  replyClick() {
    this.replyButtonWasClicked = true;
  }

  watchCommentRepliesClick() {
    this.getNextReplies();
    this.watchRepliesButtonWasClicked = true;
  }

  addCommentReplayEvent(response: string) {
    if(response == "ok") {
        // reload comments array with a new comment, so user will see like comment simply  adding to the bottom. if we don't reload all list - we won't see changes in count of replies. we reload just 5 replies (if this.pageSize = 5), so it's acceptable
        this.repliesToShow = [];
        this.pageNumber = 1;
        this.comment.repliesCount++;
        this.getNextReplies();
        this.replyButtonWasClicked = false;
    }
    else {
      // if validation on api side was failed - show modal window to say that
      this.modalWindowData = {
        title: 'Error!',
        message: response
      }
    }
  }

  hideCommentRepliesClick() {
    this.repliesToShow = [];
    this.pageNumber = 1;
    this.watchRepliesButtonWasClicked = false;
    this.showNextRepliesButton = false;
    this.sendReplyButtonWasClicked = false;
  }

  private getNextReplies() {
    this.commentsService.getCommentReplies(this.pageNumber, this.pageSize, this.comment.id)
      .pipe(take(1))
      .subscribe(res => {
        this.showNextRepliesButton = res.length == this.pageSize;
        this.repliesToShow.push(...res);
        this.sendReplyButtonWasClicked = true;
        this.pageNumber++;
      });
  }

  showNextRepliesClick() {
    this.getNextReplies()
  }

  private canClick() {
    return this.currentUserId != 0 && this.currentUserId != this.comment.ownerId;
  }
}
