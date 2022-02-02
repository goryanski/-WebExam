import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoginApiService} from "../../api/services/login.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";


@Injectable()
export class LoginService {
  constructor(
    private readonly loginApiService: LoginApiService,
    private readonly localStorage: BrowserLocalStorage
  ) {
  }

  login(login: string, password: string): Observable<string> {
    return this.loginApiService.login(login, password).pipe(
      tap(response => {
        // console.log('jwtResp - token str: ', response.accessToken);
        // console.log('role: ', response.userRole);
        // console.log('exception: ', response.exception);

        // Save token and role to localStorage
        this.localStorage.setItem('accessToken', response.accessToken);
        this.localStorage.setItem('currentUserRole', response.userRole);
      }),
      // return only exception to login component (to show there what happened)
      map(response => response.exception)
    );
  }
}
