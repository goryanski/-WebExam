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
          this.authHelper.setNonAuthenticatedUserState(); // remove
          this.authHelper.clearLocalStorage();
          this.router.navigate(['login']);

          // reload page
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);




          // reload page may be  {
          //  reloadComponent() {
          //    let currentUrl = this.router.url;
          //    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //    this.router.onSameUrlNavigation = 'reload';
          //    this.router.navigate([currentUrl]);
          //  }
          //} or rerender header (if token expires we will see profile and logout)



          return of(err.message);
        }
        return throwError(err);
      })
    );
  }
}
