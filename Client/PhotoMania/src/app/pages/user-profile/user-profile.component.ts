import { Component, OnInit } from '@angular/core';
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUserId: number = 0;
  userIdForFavouritesPosts: number = 0;

  constructor(
    private readonly localStorage: BrowserLocalStorage
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.localStorage.getCurrentUserId();
  }

  ShowFavouritesPostsClick() {
    // to load FavouritesPosts only when button ShowFavouritesPosts was clicked
    this.userIdForFavouritesPosts = this.currentUserId;
  }
}
