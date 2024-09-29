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
    this.oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.handleGoogleLogin();
        } else {
          this.alertService.errorMessage('No valid access token found', 'Error');
        }
      })
      .catch((error) => {
        this.alertService.errorMessage(error, 'Error');
      });
  }

  loginWithGoogle() {
    this.oauthService.initLoginFlow();
  }

  handleGoogleLogin() {
    this.oauthService.loadUserProfile().then((profile: any) => {
      const user = {
        email: profile.info.email,
        firstName: profile.info.given_name,
        lastName: profile.info.family_name,
      };

      this.credentialService.fetchCredentialByEmail(user.email).subscribe(
        (response: any) => {
          if (response) {
            this.processLogin(response);
          } else {
            this.registerGoogleUser(user);
          }
        },
        (error) => {
          this.alertService.errorMessage('Error while checking user', 'Error');
        }
      );
    });
  }

  registerGoogleUser(profile: any) {
    const newUser = {
      email: profile.email,
      firstname: profile.firstName,
      lastname: profile.lastName,
      role: 'candidate',
      userLevel: '1',
    };

    this.credentialService.addCredential(newUser).subscribe(
      (response: any) => {
        this.processLogin(response);
      },
      (error) => {
        this.alertService.errorMessage('Error registering user', 'Error');
      }
    );
  }

  processLogin(user: any) {
    if (user.role === 'candidate') {
      this.cookieService.createUserID(user.employeeId);
      this.cookieService.createLevel(user.userLevel);
      this.cookieService.unlock();
      this.router.navigate(['/']);
      this.alertService.successMessage('Login successful', 'Success');
    } else if (user.role === 'employer') {
      this.handleEmployerLogin(user);
    }
  }

  private handleEmployerLogin(user: any) {
    if (user.userLevel === '2') {
      this.setEmployerSession(user, '/dashboard');
    } else if (user.userLevel === '3') {
      this.setEmployerSession(user, '/pro');
    }
  }

  private setEmployerSession(user: any, route: string) {
    this.cookieService.createUserID(user.employeeId);
    this.cookieService.createAdmin(user.email);
    this.cookieService.createOrganizationID(user.companyId);
    this.cookieService.createLevel(user.userLevel);
    this.cookieService.unlock();
    this.router.navigate([route]);
  }
}
