import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {take, tap} from "rxjs/operators";
import {AuthHelper} from "../../shared/helpers/auth-helper";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public modalWindowData: any;

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

  ngOnInit(): void {}

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
              // show error in a modal window. When we change field this.modalWindowData here -  in a modal-window component will call hook ngOnChanges (because we pass this.modalWindowData to the <app-modal-window> in a html template as an @Input() parameter) and we will see the modal window with wished title and message
              this.modalWindowData = {
                title: 'Oops!',
                message: exception
              }
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
