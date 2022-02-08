import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostInterface} from "../../api/interfaces/post.interface";
import {UserProfileApiService} from "../../api/services/user-profile.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {ActivatedRoute} from "@angular/router";
import {LoadUserDataApiService} from "../../api/services/load-user-data.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-found-user',
  templateUrl: './found-user.component.html',
  styleUrls: ['./found-user.component.scss']
})
export class FoundUserComponent implements OnInit, OnDestroy {
  userNotFound: boolean = false;
  userId: number = 0;
  header: HTMLElement | null = null;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly userDataService: LoadUserDataApiService,

    //private readonly profileApiService: UserProfileApiService
  ) {
    //this.showNextPosts();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // hide header to replace it with fake header (btn back)
      this.header = document.getElementById('headerElement');
      if(this.header != null) {
        this.header.style.display = "none";
      }
      this.userDataService.getUserIdByName(params.name)
        .pipe(take(1))
        .subscribe(res => {
          if(res == -1) {
            this.userNotFound = true;
          }
          else {
            // when this id changes, app-user-profile-card will find user and app-user-posts will find user posts
            this.userId = res;
          }
          //console.log('getUserIdByName res: ', res);
        });
      //this.showNextPosts();
    });
  }

  ngOnDestroy(): void {
    // show header again
    if(this.header != null) {
      this.header.style.display = "block";
    }
  }
}
