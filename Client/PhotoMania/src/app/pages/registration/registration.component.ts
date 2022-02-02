import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthApiService} from "../../api/services/auth.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  pattern = {
    login: '^[a-zA-Z_0-9]{4,14}$', // English letters only, digits, symbol _ (4-14 symbols)
    password: '^[a-zA-Z_#@0-9]{4,16}$' // English letters only, digits, symbols _ # @ (4-16 symbols)
  }
  // path to avatar in db (we can get it after user will load the avatar - watch this.uploadFinished())
  public avatarImg: { dbPath: ''; } | undefined;
  public modalWindowData: any;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly authApiService: AuthApiService
  ) {
    this.form = this.fb.group({
      'username': this.fb.control(
        'vasya',
        [
          Validators.required,
          Validators.pattern(this.pattern.login)
        ]
      ),
      'password': this.fb.control(
        '123456',
        [
          Validators.required,
          Validators.pattern(this.pattern.password)
        ]
      ),
      'email': this.fb.control(
        'igorok208@gmail.com',
        [
          Validators.required,
          Validators.email,
        ]
      ),
      'description': this.fb.control(
        'some description',
        [
          Validators.maxLength(264)
        ]
      )
    })
  }

  ngOnInit(): void {
  }

  onRegisterClick() {
    if(this.avatarImg === undefined) {
      // the same logic as in login component
      this.modalWindowData = {
        title: 'Oops!',
        message: 'It seems you did not choose an avatar!'
      }
    }
    else {
      if (this.form.valid) {
        const {
          username,
          password,
          email,
          description
        } = this.form.value;

        this.authApiService.registration(
          username, password, email, description, this.avatarImg.dbPath
        ).pipe(
          tap(
            response => {
              if(response === 'ok') {
                // TODO: success message (modal)
              }
              else {
                // TODO: error message (modal)
              }
            }),
          take(1)
        ).subscribe();
      }
    }
  }

  onBackClick() {
    this.router.navigate(['/']);
  }

  public uploadFinished = (event: any) => {
    // in event we have the response object in which we can find a path of avatar to be saved in the database
    this.avatarImg = event;
  }
}
