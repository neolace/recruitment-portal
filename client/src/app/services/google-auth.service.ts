import {Injectable, OnDestroy} from '@angular/core';
import { AuthConfig, OAuthService } from "angular-oauth2-oidc";
import { environment } from "../../environments/environment";
import { CredentialService } from "./credential.service";
import { Router } from "@angular/router";
import { AlertsService } from "./alerts.service";
import { AuthService } from "./auth.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService implements OnDestroy {
  googleAuthConfig: AuthConfig = environment.googleAuthConfig;

  private hasLoggedIn = false;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private oauthService: OAuthService,
    private credentialService: CredentialService,
    private alertService: AlertsService,
    private cookieService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  configureOAuth() {
    this.oauthService.configure(this.googleAuthConfig);
    this.loadDiscoveryDocumentAndTryLogin();
  }

  private loadDiscoveryDocumentAndTryLogin() {
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          if (!this.cookieService.isExists()) {
            this.oauthService.logOut();
            return;
          }
          this.handleGoogleLogin();
        } else {
          this.alertService.errorMessage('No valid access token found', 'Error');
        }
      })
      .catch((error) => {
        this.alertService.errorMessage('Error loading discovery document: ' + error, 'Error');
      });
  }

  loginWithGoogle() {
    this.oauthService.initLoginFlow();
  }

  setOAuth(accessToken: string, idToken: string) {
    document.cookie = `access_token=${accessToken}; path=/; secure; SameSite=Strict`; // Removed HttpOnly
    document.cookie = `id_token=${idToken}; path=/; secure; SameSite=Strict`; // Removed HttpOnly
  }

  handleRedirectCallback() {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);

    const accessToken: any = params.get('access_token');
    const idToken: any = params.get('id_token');

    sessionStorage.setItem('access_token', accessToken);
    sessionStorage.setItem('id_token', idToken);

    if (accessToken && idToken) {
      if (!this.hasLoggedIn) {
        this.handleGoogleLogin();
        this.hasLoggedIn = true;
      }

      // Check if the token is expired and refresh if necessary
      if (this.oauthService.getAccessTokenExpiration() < Date.now() / 1000) {
        this.oauthService.refreshToken().then(() => {
          // Update the cookies after refreshing
          const newAccessToken = this.oauthService.getAccessToken();
          const newIdToken = this.oauthService.getIdToken();
          this.setOAuth(newAccessToken, newIdToken);
        }).catch(error => {
          console.error('Error refreshing token:', error);
        });
      }
    } else {
      this.alertService.errorMessage('No access token or id token found', 'Error');
    }
  }

  private handleGoogleLogin() {
    this.oauthService.loadUserProfile()
      .then((profile: any) => this.processUserProfile(profile))
      .catch((error) => {
        this.alertService.errorMessage('Error loading user profile: ' + error, 'Error');
      });
  }

  private processUserProfile(profile: any) {
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
        this.alertService.errorMessage('Error while checking user: ' + error, 'Error');
      }
    );
  }

  private registerGoogleUser(profile: any) {
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
        this.alertService.errorMessage('Error registering user: ' + error, 'Error');
      }
    );
  }

  private processLogin(user: any) {
    this.cookieService.createUserID(user.employeeId);
    this.cookieService.createLevel(user.userLevel);
    this.cookieService.unlock();
    if (user.role === 'candidate') {
      this.router.navigate(['/']);
      this.alertService.successMessage('Login successful', 'Success');
    } else if (user.role === 'employer') {
      this.handleEmployerLogin(user);
    }
  }

  private handleEmployerLogin(user: any) {
    const route = user.userLevel === '2' ? '/dashboard' : user.userLevel === '3' ? '/pro' : '/';
    this.setEmployerSession(user, route);
  }

  private setEmployerSession(user: any, route: string) {
    this.cookieService.createUserID(user.employeeId);
    this.cookieService.createAdmin(user.email);
    this.cookieService.createOrganizationID(user.companyId);
    this.cookieService.createLevel(user.userLevel);
    this.cookieService.unlock();
    this.router.navigate([route]);
  }

  logout() {
    this.oauthService.logOut();
    this.router.navigate(['/login']);
  }
}
