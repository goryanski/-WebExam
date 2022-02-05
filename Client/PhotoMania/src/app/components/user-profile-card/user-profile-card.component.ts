import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
import {LoadUserDataApiService} from "../../api/services/load-user-data.service";
import {take} from "rxjs/operators";
import {UserProfileCard} from "../../api/interfaces/user-profile-card.interface";
import {AppEnvironment} from "../../shared/app-environment.interface";

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss']
})
export class UserProfileCardComponent implements OnInit, OnChanges {
  @Input() userId: number = 0;
  user: UserProfileCard = {
    username: '',
    avatar: '',
    description: '',
    rating: 0,
    postsCount: 0,
    registrationDate: ''
  };
  isMaxRating: boolean = false;
  isUserCardReady: boolean = false;

  constructor(
    private readonly loadUserDataService: LoadUserDataApiService,
    private readonly appEnv: AppEnvironment
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if(this.userId != 0) {
      let id: SimpleChange = changes['userId'];
      // load user data by id that comes in @Input() param
      this.loadUserDataService.loadUserProfileCardInfo(id.currentValue)
        .pipe(take(1))
        .subscribe(response => {
          this.user = response;
          this.isUserCardReady = true;
          this.user.avatar = this.appEnv.apiStaticFilesURL + this.user.avatar;
          if(response.rating >= 1000000) {
            this.isMaxRating = true
          }
        });
      //console.log('UserProfileCardComponent user: ', this.user);
    }
  }

}
