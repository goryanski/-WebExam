import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";
import {Router} from "@angular/router";

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
  @ViewChild('username') username: ElementRef | undefined;

  constructor(
    private readonly appEnv: AppEnvironment,
    private readonly router: Router
  ) {
    this.apiStaticFilesURL = appEnv.apiStaticFilesURL;
  }

  ngOnInit(): void {
  }

  clickByUsername() {
    if(this.username != undefined) {
      let text: string = this.username.nativeElement.innerText;
      if(text != '') {
        this.router.navigate([`found-user/${text}`]);
      }
    }
  }
}
