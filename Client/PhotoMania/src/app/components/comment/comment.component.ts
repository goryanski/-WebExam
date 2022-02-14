import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CommentInterface} from "../../api/interfaces/comment.interface";
import {CommentReplyInterface} from "../../api/interfaces/comment-reply.interface";
import {Router} from "@angular/router";

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
  @ViewChild('username') username: ElementRef | undefined;

  constructor(
    private readonly router: Router
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
}
