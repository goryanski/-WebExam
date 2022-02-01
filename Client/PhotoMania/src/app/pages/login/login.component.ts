import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {take, tap} from "rxjs/operators";
import {AuthHelper} from "../../shared/helpers/auth-helper";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
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
    private readonly authHelper: AuthHelper,
    private readonly localStorage: BrowserLocalStorage
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
              // change links logOut, login, etc. (in a header)
              this.authHelper.setAuthenticatedUserLinks();
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
}
