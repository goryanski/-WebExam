import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {LoginApiService} from "../../api/services/login.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {JwtResponse} from "../../api/interfaces/jwt-response.interface";

// промежуточный сервис. поскольку нам нужно записать токен и вернуть данные в компонент в другом виде, нежели они приходят из LoginApiService.
@Injectable()
export class LoginService {
  constructor(
    private readonly loginApiService: LoginApiService,
    private readonly localStorage: BrowserLocalStorage,
    private readonly router: Router
  ) {
  }

  login(login: string, password: string): Observable<string> {
    return this.loginApiService.login(login, password).pipe(
      tap(response => {
        console.log('jwtResp - token str: ', response.accessToken);
        console.log('role: ', response.userRole);
        console.log('exception: ', response.exception);
        // TODO: Save token and role to localStorage, then return exception to login component
        // Save token to localStorage
        //this.localStorage.setItem('accessToken', token);
      }),
      // return only exception to login component (to show there what happened)
      map(response => response.exception)
    );
  }

  isAuthenticated(): boolean {
    return !!this.localStorage.getItem('accessToken');
  }
}
