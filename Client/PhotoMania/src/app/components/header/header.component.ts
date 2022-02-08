import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthHelper} from "../../shared/helpers/auth-helper";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchField') searchField: ElementRef | undefined;

  constructor(
    private readonly authHelper: AuthHelper,
    //private readonly localStorage: BrowserLocalStorage
    private readonly router: Router,
  private readonly activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.authHelper.checkAndSetAuthUserState();
  }

  logOut() {
    this.authHelper.setNonAuthenticatedUserState();
    this.authHelper.clearLocalStorage();
  }

  btnFindUserClick() {
    if(this.searchField != undefined) {
      let text: string = this.searchField.nativeElement.value;
      if(text != '') {
        this.router.navigate([`found-user/${text}`]);
      }
    }
  }

  btnFindPostsClick() {
    if(this.searchField != undefined) {
      let text: string = this.searchField.nativeElement.value;
      if(text != '') {
        this.router.navigate([`found-posts/${text}`]);
      }
    }
  }
}
