import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommentReplyInterface} from "../../../api/interfaces/comment-reply.interface";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {CommentsService} from "../../../api/services/comments.service";

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.scss']
})
export class CommentReplyComponent implements OnInit {
  @Input() reply: CommentReplyInterface = {
    id: 0,
    text: '',
    date: '',
    likesCount: 0,
    ownerId: 0,
    ownerName: '',
    commentId: 0,
    whomId: 0,
    whomName: ''
  };
  @Input() currentUserId: number = 0;
  @Output() addReplayToReplayEvent = new EventEmitter<string>();
  @ViewChild('replyUsername') replyUsername: ElementRef | undefined;
  @ViewChild('errorLabel') errorLabel: ElementRef | undefined;
  @ViewChild('replyLike') replyLike: ElementRef | undefined;
  replyWasClicked: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly commentsService: CommentsService
  ) { }

  ngOnInit(): void {
  }

  usernameClick() {
    if(this.replyUsername != undefined) {
      let text: string = this.replyUsername.nativeElement.innerText;
      if(text != '') {
        this.router.navigate([`found-user/${text}`]);
      }
    }
  }

  likeClick() {
    if(this.canClick()) {
      this.commentsService.setLikeToReply(this.reply.id, this.currentUserId)
        .pipe(take(1))
        .subscribe(res => {
            if(res.response === 'ok') {
              if(this.replyLike?.nativeElement.innerText != undefined) {
                let countLikes: number = parseInt(this.replyLike?.nativeElement.innerText);
                this.replyLike.nativeElement.innerText = (++countLikes).toString();
              }
            }
            else {
              if(this.errorLabel?.nativeElement.innerText != undefined) {
                this.errorLabel.nativeElement.innerText = "can't like a second time";
              }
            }
          }
        );
    }
    else {
      if(this.errorLabel?.nativeElement.innerText != undefined) {
        this.errorLabel.nativeElement.innerText = "can't like your own reply";
      }
    }
  }

  replyClick() {
    this.replyWasClicked = true;
  }

  addReplayToCommentReplayEvent(response: any) {
    // just resend that Event to comment.component.ts where is already suitable method
    this.addReplayToReplayEvent.emit(response);
  }

  private canClick() {
    return this.currentUserId != 0 && this.currentUserId != this.reply.ownerId;
  }
}
