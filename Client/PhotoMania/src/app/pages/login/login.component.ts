import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {take, tap} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userNotFound: boolean = false;
  wrongPassword: boolean = false;

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
  }

  onLoginClick() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      ///let exceptionExternal: string = 'str';
      //console.log('LoginComponent exception: ', exception);

      this.loginService.login(username, password).pipe(
        tap(
          exception => {
            //console.log('LoginComponent exception: ', exception)
            if(exception == 'none') {
              //console.log('LoginComponent exception: none')
            }
            // else if(exception == 'User login not found') {
            //   //console.log('LoginComponent exception: User login not found')
            //   //let usernameControl = this.form.controls['username'].addValidators(Validators.);
            //   //console.log('LoginComponent usernameControl: ', usernameControl);
            // }
            else {
              //console.log('LoginComponent exception: Wrong password')
              //$('#myModal').modal('show');
            }
          }),
        take(1)
      ).subscribe();
      //console.log('LoginComponent exceptionExternal: ', exceptionExternal);
    }
  }

  onBackClick() {
    this.router.navigate(['/']);
  }
}
