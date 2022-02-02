import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;
  pattern = {
    login: '^[a-zA-Z_0-9]{4,14}$', // English letters only, digits, symbol _ (4-14 symbols)
  }
  // path to avatar in db (we can get it after user will load the avatar - watch this.uploadFinished())
  public response: { dbPath: ''; } | undefined;
  public modalWindowData: any;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    //private readonly authService: AuthenticationService
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
          Validators.minLength(4),
          Validators.maxLength(16)
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
    // imgPath: this.response.dbPath
    if(this.response === undefined) {
      // the same logic as in login component
      this.modalWindowData = {
        title: 'Oops!',
        message: 'It seems you did not choose an avatar!'
      }
    }
    else {
      //console.log('okay');
      if (this.form.valid) {
        const {
          username,
          password,
          email,
          description
        } = this.form.value;
        console.log(`${username}\n${password}\n${email}\n${description}`)
      }
    }
  }

  onBackClick() {
    this.router.navigate(['/']);
  }

  public uploadFinished = (event: any) => {
    // in event we have the response object in which we can find a path of avatar to be saved in the database
    this.response = event;
  }
}
