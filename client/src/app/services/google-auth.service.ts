import { Injectable } from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";
import {CredentialService} from "./credential.service";
import {Router} from "@angular/router";
import {AlertsService} from "./alerts.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  googleAuthConfig: AuthConfig = environment.googleAuthConfig;
  constructor(
    private oauthService: OAuthService,
    private credentialService: CredentialService,
    private alertService: AlertsService,
    private cookieService: AuthService,
    private router: Router
  ) { }

  configureOAuth() {
    this.oauthService.configure(this.googleAuthConfig);
    this.loadDiscoveryDocumentAndTryLogin();
  }

  loadDiscoveryDocumentAndTryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      debugger; // Pause execution here to inspect the state
      this.logToLocalStorage('Discovery document loaded');
      if (this.oauthService.hasValidAccessToken()) {
        this.logToLocalStorage('Valid access token found');
        this.handleGoogleLogin();
      } else {
        this.logToLocalStorage('No valid access token found');
      }
    }).catch(error => {
      this.logToLocalStorage('Error during OAuth configuration: ' + error);
    });
  }

  private logToLocalStorage(message: string) {
    const logs = localStorage.getItem('oauthLogs') || '';
    localStorage.setItem('oauthLogs', logs + message + '\n');
  }

  loginWithGoogle() {
    this.logToLocalStorage('Initiating login with Google...');
    this.oauthService.initLoginFlow();
    this.logToLocalStorage('Redirecting to Google for login...');
  }

  handleGoogleLogin() {
    this.oauthService.loadUserProfile().then((profile: any) => {
      this.logToLocalStorage('User profile: ' + JSON.stringify(profile));
      const user = {
        email: profile['email'],
        firstName: profile['given_name'],
        lastName: profile['family_name']
      };

      // Check if Google user exists in database
      this.credentialService.fetchCredentialByEmail(user.email).subscribe((response: any) => {
        if (response) {
          this.processLogin(response);
        } else {
          this.registerGoogleUser(user);
        }
      }, error => {
        this.alertService.errorMessage('Error occurred while checking user existence', 'Error');
      });
    });
  }

  registerGoogleUser(profile: any) {
    const newUser = {
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: 'candidate',  // default role
      userLevel: '1'      // default user level
    };

    this.credentialService.addCredential(newUser).subscribe((response: any) => {
      // User registered, proceed with login
      this.processLogin(response);
    }, error => {
      this.alertService.errorMessage('Error occurred while registering user', 'Error');
    });
  }

  processLogin(user: any) {
    if (user.role === 'candidate') {
      this.cookieService.createUserID(user.employeeId);
      this.cookieService.createLevel(user.userLevel);
      this.cookieService.unlock();
      this.router.navigate(['/']);
      this.alertService.successMessage('Login successful', 'Success');
    } else if (user.role === 'employer') {
      if (user.userLevel === "2") {
        this.cookieService.createUserID(user.employeeId);
        this.cookieService.createAdmin(user.email);
        this.cookieService.createOrganizationID(user.companyId);
        this.cookieService.createLevel(user.userLevel);
        this.cookieService.unlock();
        this.router.navigate(['/dashboard']);
      } else if (user.userLevel === "3") {
        this.cookieService.createUserID(user.employeeId);
        this.cookieService.createProAdmin(user.email);
        this.cookieService.createOrganizationID(user.companyId);
        this.cookieService.createLevel(user.userLevel);
        this.cookieService.unlock();
        this.router.navigate(['/pro']);
      }
    }
  }
}
