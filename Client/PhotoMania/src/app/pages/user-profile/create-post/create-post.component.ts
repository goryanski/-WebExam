import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {take, tap} from "rxjs/operators";
import {PostsApiService} from "../../../api/services/posts.service";
import {BrowserLocalStorage} from "../../../shared/storage/local-storage";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  form: FormGroup;
  pattern = {
    description: '^[a-zA-Z ,.!/:+@_^0-9]{4,64}$' // English letters only, digits, space, symbols ,.!/+@:_^ 4-64 symbols
  }
  // path to photo in db (we can get it after user uploads the photo - watch this.uploadFinished())
  public photo: { dbPath: ''; } | undefined;
  public modalWindowData: any;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly localStorage: BrowserLocalStorage,
    private readonly postsService: PostsApiService
  ) {
    this.form = this.fb.group({
      'description': this.fb.control(
        'some description',
        [
          Validators.required,
          Validators.pattern(this.pattern.description)
        ]
      )
    });
  }

  ngOnInit(): void {
  }

  public uploadFinished = (event: any) => {
    // in event we have the response object in which we can find a path of photo to be saved in the database
    this.photo = event;
  }


  onCreateClick() {
    if(this.photo === undefined) {
      this.modalWindowData = {
        title: 'Oops!',
        message: 'It seems you did not choose a photo!'
      }
    }
    else {
      if (this.form.valid) {
        const { description } = this.form.value;
        this.postsService.createPost(
          description, this.photo.dbPath, this.localStorage.getCurrentUserId()
        )
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
  }
}
