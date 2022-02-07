import { Component, OnInit } from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {UserProfileApiService} from "../../api/services/user-profile.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-found-user',
  templateUrl: './found-user.component.html',
  styleUrls: ['./found-user.component.scss']
})
export class FoundUserComponent implements OnInit {
  postsToShow: PostInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  currentPosition =  window.pageYOffset;
  noPostsAtAll: boolean = false;

  constructor(
    //private readonly profileApiService: UserProfileApiService
  ) {
    //this.showNextPosts();
  }

  ngOnInit(): void {
  }

}
