import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {LoadUserDataApiService} from "../../api/services/load-user-data.service";

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit, OnChanges {
  @Input() userId: number = 0;

  constructor(
    private readonly loadUserDataService: LoadUserDataApiService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if(this.userId != 0) {
      let id: SimpleChange = changes['userId'];
      console.log('UserProfileCardComponent new user id: ', id.currentValue);
      // load user data by id
      this.loadUserDataService.loadUserProfileCardInfo(id.currentValue).subscribe();
    }
  }

}
