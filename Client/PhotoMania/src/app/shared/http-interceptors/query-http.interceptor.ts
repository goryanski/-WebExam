import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {BrowserLocalStorage} from "../storage/local-storage";
import {AuthHelper} from "../helpers/auth-helper";

@Injectable()
export class QueryHttpInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly browserLocalStorage: BrowserLocalStorage,
    private readonly authHelper: AuthHelper
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          // log out
          console.log('interceptor works!');
          this.authHelper.setNonAuthenticatedUserState();
          this.authHelper.clearLocalStorage();// remove
          this.router.navigate(['login']);

          setTimeout(() => {
            document.location.reload();
          },500);



          return of(err.message);
        }
        return throwError(err);
      })
    );
  }
}
