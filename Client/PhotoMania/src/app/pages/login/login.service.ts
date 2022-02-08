import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthApiService} from "../../api/services/auth.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";


@Injectable()
export class LoginService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly localStorage: BrowserLocalStorage
  ) {
  }

  login(login: string, password: string): Observable<string> {
    return this.authApiService.login(login, password).pipe(
      tap(response => {
        // Save token and role to localStorage
        this.localStorage.setItem('accessToken', response.accessToken);
        this.localStorage.setItem('y16', response.userRole); // currentUserRole
        this.localStorage.setItem('v33', response.userId); // currentUserId
      }),
      // return only exception to login component (to show there what happened)
      map(response => response.exception)
    );
  }
}
