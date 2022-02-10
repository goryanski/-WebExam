import {Component, HostListener, Input, OnInit, SimpleChange} from '@angular/core';
import {PostInterface} from "../../../api/interfaces/post.interface";
import {UserProfileApiService} from "../../../api/services/user-profile.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-user-favorites-posts',
  templateUrl: './user-favorites-posts.component.html',
  styleUrls: ['./user-favorites-posts.component.scss']
})
export class UserFavoritesPostsComponent implements OnInit {
  postsToShow: PostInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  currentPosition =  window.pageYOffset;
  noPostsAtAll: boolean = false;
  @Input() userId: number = 0;

  constructor(
    private readonly profileApiService: UserProfileApiService,
  ) { }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if(this.userId != 0) {
      this.showNextPosts();
    }
  }

  ngOnInit(): void {
  }

  // for window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(e: HTMLElement) {
    let scroll =  window.pageYOffset;
    if (scroll > this.currentPosition && this.userId != 0) {
      this.showNextPosts();
    }
    this.currentPosition = scroll;
  }

  showNextPosts() {
    if(this.userId != 0) {
      this.profileApiService.getNextPosts(this.pageNumber, this.pageSize, 'favourites', this.userId)
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

}
