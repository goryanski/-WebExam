import { Component, OnInit } from '@angular/core';
import {UserProfileService} from "./user-profile.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUserId: number = 0;
  constructor(private readonly profileService: UserProfileService) {}

  ngOnInit(): void {
    this.currentUserId = this.profileService.getCurrentUserId();
  }

}
