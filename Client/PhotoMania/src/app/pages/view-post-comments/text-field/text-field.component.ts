import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {take} from "rxjs/operators";
import {CommentsService} from "../../../api/services/comments.service";

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, OnChanges {
  @Input() way: string = '';
  @Input() label: string = '';
  @Input() postId: number = 0;
  @Input() currentUserId: number = 0;
  @Input() commentOwnerName: string = '';
  @Input() commentId: number = 0;
  @Output() addCommentEvent = new EventEmitter<string>();
  @Output() addCommentReplayEvent = new EventEmitter<string>();
  @Output() addReplayToCommentReplayEvent = new EventEmitter<string>();
  form: FormGroup;
  pattern = {
    comment: '^[a-zA-Z ,.!/:+@_^();?0-9]{2,42}$', // English letters only, digits, space, symbols ,.!/:+@_^();? 2-42 symbols
  }

  constructor(
    private readonly commentsService: CommentsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      'comment': this.fb.control(
        '',
        [
          Validators.pattern(this.pattern.comment)
        ]
      )
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if(this.way != '') {
      let changeWay: SimpleChange = changes['way'];
      if(changeWay.currentValue == 'reply to comment') {
        this.label = `Write a reply to ${this.commentOwnerName}`;
      }
    }
  }

  sendClick(text: string) {
    if (this.form.valid && text != '') {
      // clear comment field
      this.form.controls['comment'].setValue('');

      // 3 ways:
      if(this.way == 'add comment') {
        this.addComment(text);
      }
      else if(this.way == 'reply to comment') {
        this.addReplyToComment(text);
      }
      else if(this.way == 'reply to reply') {
        this.addReplyToCommentReply(text);
      }
    }
  }

  private addComment(comment: string) {
      this.commentsService.addComment(comment, this.postId, this.currentUserId)
        .pipe(take(1))
        .subscribe(res => {
          this.addCommentEvent.emit(res.response);
        });
  }

  private addReplyToComment(reply: string) {
    this.commentsService.addReplyToComment(
      reply, this.commentId, this.currentUserId, this.commentOwnerName
    ).pipe(take(1))
      .subscribe(res => {
        this.addCommentReplayEvent.emit(res.response);
      });
  }

  private addReplyToCommentReply(reply: string) {
    // the same query like previous, but Event we send to comment-reply.component.ts
    this.commentsService.addReplyToComment(
      reply, this.commentId, this.currentUserId, this.commentOwnerName
    ).pipe(take(1))
      .subscribe(res => {
        this.addReplayToCommentReplayEvent.emit(res.response);
      });
  }
}
