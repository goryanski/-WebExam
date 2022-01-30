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
      // let exception: string = this.loginService.login(username, password);
      // console.log('LoginComponent exception: ', exception);
      this.loginService.login(username, password).pipe(
        tap(exception => console.log('LoginComponent exception: ', exception)),
        take(1)
      ).subscribe();
      //console.log('LoginComponent exception: ', exception);
    }
  }

  onBackClick() {
    this.router.navigate(['/']);
  }
}
