import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../../../shared/storage/local-storage";
import {take, tap} from "rxjs/operators";
import {LoadUserDataApiService} from "../../../api/services/load-user-data.service";
import {UserInterface} from "../../../api/interfaces/user.interface";
import {UserProfileApiService} from "../../../api/services/user-profile.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  pattern = {
    login: '^[a-zA-Z_.^!0-9]{4,14}$', // English letters only, digits, symbols _.^! (4-14 symbols). at least 4 letters
    password: '^[a-zA-Z_#@.^!0-9]{4,16}$', // English letters only, digits, symbols _#@.^! (4-16 symbols)
    email: '^[a-zA-Z0-9][a-zA-Z0-9!#$%&+-/?^_{|}~]{2,32}@[a-zA-Z]{2,24}\\.[a-zA-Z]{2,16}$', // Email is incorrect
    description: '^[a-zA-Z ,.!/:+@_0-9]{0,264}$' // English letters only, digits, space, symbols ,.!/+@:_ Max 264 symbols
  }
  public avatarImg: { dbPath: ''; } | undefined;
  public modalWindowData: any;
  currentUserId: number = 0;
  oldUsername: string = '';
  oldDescription: string = '';
  oldEmail: string = '';
  @ViewChild('chbChangeAvatar') chbChangeAvatar: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly localStorage: BrowserLocalStorage,
    private readonly loadUserDataService: LoadUserDataApiService,
    private readonly userProfileService: UserProfileApiService
  ) {
    this.form = this.fb.group({
      'username': this.fb.control(
        '',
        [
          Validators.required,
          Validators.pattern(this.pattern.login)
        ]
      ),
      'password': this.fb.control(
        '',
        [
          Validators.pattern(this.pattern.password)
        ]
      ),
      'email': this.fb.control(
        '',
        [
          Validators.required,
          Validators.pattern(this.pattern.email)
        ]
      ),
      'description': this.fb.control(
        '',
        [
          Validators.maxLength(264),
          Validators.pattern(this.pattern.description)
        ]
      )
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.localStorage.getCurrentUserId();
    this.loadUserDataService.loadGeneralUserData(this.currentUserId)
      .subscribe(
        user => {
          this.form.patchValue({
            username: user.username,
            description: user.description,
            email: user.email
          }, {emitEvent: false});

          // remember old user data
          this.oldUsername = user.username;
          this.oldDescription = user.description;
          this.oldEmail = user.email;
        }
      );
  }

  // for avatar
  public uploadFinished = (event: any) => {
    this.avatarImg = event;
  }


  onEditClick() {
    if (this.form.valid) {
      let user: UserInterface = this.form.value;
      this.simplifyUserFields(user);
      user.id = this.currentUserId;

      // check if avatar was changed
      if(this.chbChangeAvatar?.nativeElement.checked != undefined) {
        let chbChangeAvatar: boolean =  this.chbChangeAvatar.nativeElement.checked;
        if(chbChangeAvatar && this.avatarImg != undefined) {
          user.avatar = this.avatarImg.dbPath;
        }
        // otherwise return ''
      }

      this.userProfileService.editUserPersonalInfo(user)
        .pipe(
          tap(
            res => {
              if(res.response == 'ok') {
                document.location.reload();
              }
              else {
                this.modalWindowData = {
                  title: 'Error!',
                  message: res.response
                }
              }
            }),
          take(1)
        ).subscribe();
    }
  }

  private simplifyUserFields(user: UserInterface) {
    // fields that have not been changed we leave empty to simplify validation in api (it's no sense to check and update fields that have not been changed)
    if(user.username === this.oldUsername) {
      user.username = '';
    }
    if(user.description === this.oldDescription) {
      user.description = '';
    }
    if(user.email === this.oldEmail) {
      user.email = '';
    }
    user.avatar = '';
  }
}
