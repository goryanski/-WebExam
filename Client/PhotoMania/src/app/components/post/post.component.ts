import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: PostInterface = {
    id: 0,
    photoPath: '',
    description: '',
    date: '',
    likesCount: 0,
    dislikesCount: 0,
    username: '',
    commentsCount: ''
  };
  apiStaticFilesURL = '';

  constructor(
    private readonly appEnv: AppEnvironment
  ) {
    this.apiStaticFilesURL = appEnv.apiStaticFilesURL;
  }

  ngOnInit(): void {
  }
}
