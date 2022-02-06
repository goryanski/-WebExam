import {Component, HostListener, Input, OnInit} from '@angular/core';
import {UserProfileApiService} from "../../../api/services/user-profile.service";
import {PostInterface} from "../../../api/interfaces/post.interface";
import {take} from "rxjs/operators";
import {BrowserLocalStorage} from "../../../shared/storage/local-storage";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  postsToShow: PostInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  currentPosition =  window.pageYOffset;
  noPostsAtAll: boolean = false;
  //@Input() userId: number = 0; user Id will be @Input() parameter because we must know if user wants to see his own posts, or it's another user want to see posts of someone. but now we will consider that user seeing his own parameters
  userId: number = 0;


  constructor(
    private readonly profileApiService: UserProfileApiService,
    private readonly localStorage: BrowserLocalStorage
  ) {
    let storagedId = this.localStorage.getItem('currentUserId');
    if(storagedId != null) {
      this.userId = parseInt(storagedId);
    }
    this.showNextPosts();
  }

  ngOnInit(): void {
  }

  // for window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(e: HTMLElement) {
    let scroll =  window.pageYOffset;
    if (scroll > this.currentPosition) {
      // scrollDown (scrollUp - nothing to do)
      this.showNextPosts();
    }
    this.currentPosition = scroll;
  }

  showNextPosts() {
    if(this.userId != 0) {
      this.profileApiService.getNextPosts(this.pageNumber, this.pageSize, 'posts', this.userId)
        .pipe(take(1))
        .subscribe(res => {
          // if the user has no posts at all
          if(res.length == 0 && this.pageNumber == 1) {
            this.noPostsAtAll = true;
          }
          this.postsToShow.push(...res)
          this.pageNumber++;
        });
    }
    else{
      console.log('can not send query to display user posts because userId absent in local storage or something else')
    }
  }
}
