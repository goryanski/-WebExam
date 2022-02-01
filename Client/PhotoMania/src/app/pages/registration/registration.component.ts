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
    login: '^[a-zA-Z_]{4,14}$', // English letters only, symbol _ (4-14 symbols)
  }

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

  }

  onBackClick() {

  }
}
