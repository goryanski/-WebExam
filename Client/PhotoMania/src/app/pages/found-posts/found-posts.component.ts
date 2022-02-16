import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {take} from "rxjs/operators";
import {PostInterface} from "../../api/interfaces/post.interface";
import {PostsApiService} from "../../api/services/posts.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-found-posts',
  templateUrl: './found-posts.component.html',
  styleUrls: ['./found-posts.component.scss']
})
export class FoundPostsComponent implements OnInit, OnDestroy {
  postsToShow: PostInterface[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  currentPosition =  window.pageYOffset;
  noPostsAtAll: boolean = false;
  searchKey: string = '';
  header: HTMLElement | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly postsService: PostsApiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // hide header to replace it with fake header (btn back)
      this.header = document.getElementById('headerElement');
      if(this.header != null) {
        this.header.style.display = "none";
      }
      this.searchKey = params.key;
      this.showNextPosts();
    });
  }

  // for window scroll events
  @HostListener('window:scroll', ['$event'])
  onScroll(e: HTMLElement) {
    let scroll =  window.pageYOffset;
    if (scroll > this.currentPosition && this.searchKey != '') {
      this.showNextPosts();
    }
    this.currentPosition = scroll;
  }

  showNextPosts() {
     this.postsService.getNextPosts(this.pageNumber, this.pageSize,  this.searchKey)
       .pipe(take(1))
       .subscribe(res => {
         if(res.length == 0 && this.pageNumber == 1) {
           this.noPostsAtAll = true;
         }
         this.postsToShow.push(...res)
         this.pageNumber++;
       });
  }

  ngOnDestroy(): void {
    // show header again
    if(this.header != null) {
      this.header.style.display = "block";
    }
  }
}
