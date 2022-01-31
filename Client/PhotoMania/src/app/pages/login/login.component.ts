import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {take, tap} from "rxjs/operators";
import {HeaderComponent} from "../../components/header/header.component";
declare var window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  formModal: any;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
  ) {
    this.form = this.fb.group({
      'username': this.fb.control(
        'user',
        [
          Validators.required
        ]
      ),
      'password': this.fb.control(
        'user',
        [
          Validators.required
        ]
      )
    })
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('myModal')
    );
  }

  onLoginClick() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      this.loginService.login(username, password).pipe(
        tap(
          exception => {
            if(exception == 'none') {
              this.changeAuthButtons();
              this.router.navigate(['/']);
            }
            else {
              // show error in a modal window
              let modalMessage = document.getElementById('modalMessage');
              if(modalMessage != null) {
                modalMessage.innerText = exception;
              }
              this.formModal.show();
            }
          }),
        take(1)
      ).subscribe();
    }
  }

  onBackClick() {
    this.router.navigate(['/']);
  }

  changeAuthButtons() {
    let logOutLink = document.getElementById('logOutLink');
    let loginLink = document.getElementById('loginLink');
    let registrationLink = document.getElementById('registrationLink');

    if(logOutLink != null) {
      logOutLink.style.display = "block";
    }
    if(registrationLink != null) {
      registrationLink.style.display = "none";
    }
    if(loginLink != null) {
      loginLink.style.display = "none";
    }
  }
}
