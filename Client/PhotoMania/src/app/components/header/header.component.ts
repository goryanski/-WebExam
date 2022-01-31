import { Component, OnInit } from '@angular/core';
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated: boolean;
  userRole: string;

  constructor(private readonly localStorage: BrowserLocalStorage) {
    this.isUserAuthenticated = this.localStorage.isUserAuthenticated();
    this.userRole = this.localStorage.getUserRole();
    // console.log('isUserAuthenticated: ', this.isUserAuthenticated);
    // console.log('userRole: ', this.userRole);
    console.log('HeaderComponent constructor');
  }

  ngOnInit(): void {
    // console.log('isUserAuthenticated: ', this.isUserAuthenticated);
    // console.log('userRole: ', this.userRole);
    this.setAuthButtons();
    console.log('HeaderComponent ngOnInit');
  }

  setAuthButtons() {
    let logOutLink = document.getElementById('logOutLink');
    let loginLink = document.getElementById('loginLink');
    let registrationLink = document.getElementById('registrationLink');
    //let
    if(this.isUserAuthenticated) {


      if(logOutLink != null) {
        logOutLink.style.display = "block";
      }
      if(registrationLink != null) {
        registrationLink.style.display = "none";
      }
      if(loginLink != null) {
        loginLink.style.display = "none";
      }
    }
  }
}
