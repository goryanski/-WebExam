import {Component, HostListener, OnInit} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {Router} from "@angular/router";
import {HomeService} from "../../api/services/home.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 2;
  postsToShow: PostInterface[] = [];
  currentPosition =  window.pageYOffset;
  isConnectionError = false;

  constructor(
    private readonly router: Router,
    private readonly homeService: HomeService,
  ) {
    this.showNextPosts();
    setTimeout(() => {
      if(this.postsToShow.length == 0) {
        this.isConnectionError = true;
      }
    },3000);
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
    this.homeService.getNextPosts(this.pageNumber, this.pageSize)
      .pipe(take(1))
      .subscribe(res => this.postsToShow.push(...res));
    this.pageNumber++;
  }
}
