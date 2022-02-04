import {Injectable} from "@angular/core";
import {AuthApiService} from "../../api/services/auth.service";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";

@Injectable()
export class UserProfileService {
  constructor(
    private readonly localStorage: BrowserLocalStorage
  ) {
  }

  getCurrentUserId(): number {
    let id = localStorage.getItem('currentUserId');
    if(id != null && id != 'none') {
      return parseInt(id);
    }
    return 0;
  }
}
