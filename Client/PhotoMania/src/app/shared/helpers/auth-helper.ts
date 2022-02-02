import {Injectable} from "@angular/core";
import {BrowserLocalStorage} from "../storage/local-storage";

@Injectable()
export class AuthHelper {
  logOutLink: any;
  loginLink: any;
  registrationLink: any;
  profileLink: any;
  adminPanelLink: any;
  moderatorPanelLink: any;

  constructor(private readonly localStorage: BrowserLocalStorage) {}

  initFields() {
    this.logOutLink = document.getElementById('logOutLink');
    this.loginLink = document.getElementById('loginLink');
    this.registrationLink = document.getElementById('registrationLink');
    this.profileLink = document.getElementById('profileLink');
    this.adminPanelLink = document.getElementById('adminPanelLink');
    this.moderatorPanelLink = document.getElementById('moderatorPanelLink');
  }

  checkAndSetAuthUserLinks() {
    if(this.localStorage.isUserAuthenticated()) {
      this.setAuthenticatedUserLinks();
    }
    else {
      this.setNonAuthenticatedUserLinks();
    }
  }

  setAuthenticatedUserLinks() {
    this.initFields();

    if(this.registrationLink != null) {
      this.registrationLink.style.display = "none";
    }
    if(this.logOutLink != null) {
      this.logOutLink.style.display = "block";
    }
    if(this.loginLink != null) {
      this.loginLink.style.display = "none";
    }

    let role = this.localStorage.getUserRole();
    if(role != 'none') {
      switch (role) {
        case 'user': {
          if(this.profileLink != null) {
            this.profileLink.style.display = "block";
          }
          break;
        }
        case 'admin': {
          if(this.adminPanelLink != null) {
            this.adminPanelLink.style.display = "block";
          }
          break;
        }
        case 'moderator': {
          if(this.moderatorPanelLink != null) {
            this.moderatorPanelLink.style.display = "block";
          }
          break;
        }
      }
    }
  }

  setNonAuthenticatedUserLinks() {
    this.initFields();
    if(this.logOutLink != null) {
      this.logOutLink.style.display = "none";
    }
    if(this.registrationLink != null) {
      this.registrationLink.style.display = "block";
    }
    if(this.loginLink != null) {
      this.loginLink.style.display = "block";
    }
    if(this.profileLink != null) {
      this.profileLink.style.display = "none";
    }
    if(this.adminPanelLink != null) {
      this.adminPanelLink.style.display = "none";
    }
    if(this.moderatorPanelLink != null) {
      this.moderatorPanelLink.style.display = "none";
    }
  }


}