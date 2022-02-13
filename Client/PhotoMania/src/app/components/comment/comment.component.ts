import {Component, Input, OnInit} from '@angular/core';
import {CommentInterface} from "../../api/interfaces/comment.interface";
import {CommentReplyInterface} from "../../api/interfaces/comment-reply.interface";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
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
