import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BrowserLocalStorage} from "../../../shared/storage/local-storage";
import {PostsApiService} from "../../../api/services/posts.service";
import {take, tap} from "rxjs/operators";
import {LoadUserDataApiService} from "../../../api/services/load-user-data.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  pattern = {
    login: '^[a-zA-Z_0-9]{4,14}$', // English letters only, digits, symbol _ (4-14 symbols)
    password: '^[a-zA-Z_#@0-9]{4,16}$', // English letters only, digits, symbols _ # @ (4-16 symbols)
    email: '^[a-zA-Z0-9][a-zA-Z0-9!#$%&+-/?^_{|}~]{2,32}@[a-zA-Z]{2,24}\\.[a-zA-Z]{2,16}$', // Email is incorrect
    description: '^[a-zA-Z ,.!/+@_0-9]{0,264}$' // English letters only, digits, space, symbols ,.!/+@_ Max 264 symbols
  }
  // path to avatar in db (we can get it after user uploads the avatar - watch this.uploadFinished())
  public avatarImg: { dbPath: ''; } | undefined;
  public modalWindowData: any;
  currentUserId: number = 0;
  oldAvatarPath: string = '';

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly localStorage: BrowserLocalStorage,
    private readonly loadUserDataService: LoadUserDataApiService
    //private readonly postsService: PostsApiService
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
          Validators.required,
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

          this.oldAvatarPath = user.avatar;
        }
      );
  }

  public uploadFinished = (event: any) => {
    // in event we have the response object in which we can find a path of photo to be saved in the database
    this.avatarImg = event;
  }


  onEditClick() {
    // if(this.avatarImg === undefined) {
    //   this.modalWindowData = {
    //     title: 'Oops!',
    //     message: 'It seems you did not choose a photo!'
    //   }
    // }
    // else {
    //   if (this.form.valid) {
    //     const { description } = this.form.value;
    //     this.postsService.createPost(
    //       description, this.photo.dbPath, this.localStorage.getCurrentUserId()
    //     )
    //       .pipe(
    //         tap(
    //           res => {
    //             if(res.response == 'ok') {
    //               document.location.reload();
    //             }
    //             else {
    //               this.modalWindowData = {
    //                 title: 'Error!',
    //                 message: res.response
    //               }
    //             }
    //           }),
    //         take(1)
    //       ).subscribe();
    //   }
    // }
  }

  // onEditPhotoClick() {
  //   if (this.form.valid) {
  //     const photo: PhotoInterface = this.form.value;
  //     photo.id = this.selectedPhotoId;
  //     this.photoGalleryApiService.editPhoto(photo)
  //       .pipe(
  //         tap(photo => alert('edited')),
  //         take(1)
  //       )
  //       .subscribe();
  //   }
  // }
}
