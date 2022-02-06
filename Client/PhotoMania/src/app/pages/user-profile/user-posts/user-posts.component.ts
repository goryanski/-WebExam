import {Component, HostListener, OnInit} from '@angular/core';
import {UserProfileApiService} from "../../../api/services/user-profile.service";
import {PostInterface} from "../../../api/interfaces/post.interface";
import {take} from "rxjs/operators";

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


  constructor(
    private readonly profileApiService: UserProfileApiService
  ) {
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
    this.profileApiService.getNextPosts(this.pageNumber, this.pageSize, 'posts')
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
}
