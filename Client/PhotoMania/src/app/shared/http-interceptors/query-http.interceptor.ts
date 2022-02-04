import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {BrowserLocalStorage} from "../storage/local-storage";

@Injectable()
export class QueryHttpInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly browserLocalStorage: BrowserLocalStorage
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.browserLocalStorage.removeItem('accessToken');
          this.browserLocalStorage.removeItem('currentUserRole');
          this.browserLocalStorage.removeItem('currentUserId');


          // reload page may be  {
          //  reloadComponent() {
          //    let currentUrl = this.router.url;
          //    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          //    this.router.onSameUrlNavigation = 'reload';
          //    this.router.navigate([currentUrl]);
          //  }
          //}

          this.router.navigate(['login']);

          return of(err.message);
        }
        return throwError(err);
      })
    );
  }
}
