import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {CredentialService} from "../credential.service";
import {Router} from "@angular/router";
import {AlertsService} from "../alerts.service";
import {AuthService} from "../auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GitHubAuthService {
  private clientId = environment.githubAuthConfig.clientId;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private credentialService: CredentialService,
              private cookieService: AuthService,
              private alertService: AlertsService) {
  }

  loginWithGitHub() {
    const redirectUri = encodeURIComponent(window.location.origin + '/oauth-callback/github');
    const url = `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    window.location.href = url;
  }

  handleRedirectCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('Authorization code not found');
    }
  }

  private exchangeCodeForToken(code: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:password')
    });
    this.http.post<{ accessToken: string }>(this.baseUrl + '/github/token', {code}, {headers})
      .subscribe(
        (response) => {
          const accessToken = response.accessToken;
          this.getUserEmails(accessToken);
          this.getUserInfo(accessToken);
        },
        (error) => {
          console.error('Error exchanging code for token:', error);
        }
      );
  }

  private getUserInfo(accessToken: string) {
    const userInfoEndpoint = 'https://api.github.com/user';

    this.http.get(userInfoEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).subscribe(
      (profile: any) => this.processUserProfile(profile),
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  private getUserEmails(accessToken: string) {
    const emailEndpoint = 'https://api.github.com/user/emails';

    this.http.get(emailEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).subscribe(
      (emails: any) => {
        const primaryEmail = emails.find((email: any) => email.primary);
        sessionStorage.setItem('primaryEmail', primaryEmail ? primaryEmail.email : '');
      },
      (error) => {
        console.error('Error loading user emails:', error);
      }
    );
  }

  private processUserProfile(profile: any) {
    setTimeout(() => {
    }, 1000)

    if (sessionStorage.getItem('primaryEmail') === null) {
      this.alertService.errorMessage('Primary email not found', 'Error');
      return;
    }

    if (profile) {
      const user = {
        email: sessionStorage.getItem('primaryEmail'),
        firstName: profile.name ? profile.name.split(' ')[0] : profile.login,
        lastName: profile.name ? profile.name.split(' ')[1] : '',
        username: profile.login,
        avatarUrl: profile.avatar_url,
      };

      this.credentialService.fetchCredentialByEmail(user.email).subscribe(
        (response: any) => {
          if (response) {
            this.processLogin(response);
          } else {
            this.registerGitHubUser(user);
          }
        },
        (error) => {
          this.alertService.errorMessage('Error while checking user: ' + error, 'Error');
        }
      );
    } else {
      this.alertService.errorMessage('Invalid user profile data received', 'Error');
    }
  }

  private registerGitHubUser(profile: any) {
    const referer = this.cookieService.getReferer();
    const platform = this.cookieService.getPlatform();
    const promotion = this.cookieService.getPromotion();
    const newUser = {
      email: profile.email,
      firstname: profile.firstName,
      lastname: profile.lastName,
      role: 'candidate',
      userLevel: '1',
      referrerId: referer,
      platform: platform,
      promotion: promotion,
      active: true
    };

    this.credentialService.register(newUser).subscribe(
      (response: any) => {
        this.processLogin(response);
      },
      (error) => {
        this.alertService.errorMessage('Error registering user: ' + error, 'Error');
      }
    );
  }

  private processLogin(user: any) {
    this.cookieService.createUserID(user.employeeId.toString());
    this.cookieService.createLevel(user.userLevel.toString());
    this.cookieService.createAuthToken(user.token);
    this.cookieService.createRefreshToken(user.refreshToken);
    this.cookieService.unlock();
    setTimeout(() => {
      if (user.role === 'candidate') {
        this.router.navigate(['/candidate-profile']);
        this.alertService.successMessage('Login successful', 'Success');
      } else if (user.role === 'employer') {
        this.handleEmployerLogin(user);
      }
    },500)
  }

  private handleEmployerLogin(user: any) {
    const route = user.userLevel === '2' ? '/dashboard' : user.userLevel === '3' ? '/pro' : '/';
    this.setEmployerSession(user, route);
  }

  private setEmployerSession(user: any, route: string) {
    this.cookieService.createAdmin(user.email);
    user.organizations?.forEach((organization: any) => {
      this.cookieService.createOrganizationID(organization.jobPortal || '');
    });
    this.router.navigate([route]);
  }
}
