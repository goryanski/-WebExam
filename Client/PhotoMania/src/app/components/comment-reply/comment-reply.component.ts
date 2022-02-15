import {Component, Input, OnInit} from '@angular/core';
import {CommentReplyInterface} from "../../api/interfaces/comment-reply.interface";

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

  constructor() { }

  ngOnInit(): void {
  }

  usernameClick() {

  }

  likeClick() {

  }

  replyClick() {

  }
}
