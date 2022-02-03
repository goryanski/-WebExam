import { Component, OnInit } from '@angular/core';
import {AuthHelper} from "../../shared/helpers/auth-helper";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly authHelper: AuthHelper,
    private readonly localStorage: BrowserLocalStorage
  ) {

    // let searchHeaderForm = document.getElementById('searchHeaderForm');
    // if(searchHeaderForm != null) {
    //   searchHeaderForm.style.display = "none !important";
    // }
  }

  ngOnInit(): void {
    this.authHelper.checkAndSetAuthUserState();
  }

  logOut() {
    this.authHelper.setNonAuthenticatedUserState();
    this.localStorage.removeItem('accessToken');
    this.localStorage.removeItem('currentUserRole');
  }
}
