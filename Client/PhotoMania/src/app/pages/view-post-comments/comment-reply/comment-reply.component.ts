import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommentReplyInterface} from "../../../api/interfaces/comment-reply.interface";
import {Router} from "@angular/router";

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
  replyWasClicked: boolean = false;

  constructor(
    private readonly router: Router
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

  }

  replyClick() {
    this.replyWasClicked = true;
  }

  addReplayToCommentReplayEvent(response: any) {
    // just resend that Event to comment.component.ts where is already suitable method
    this.addReplayToReplayEvent.emit(response);
  }
}
