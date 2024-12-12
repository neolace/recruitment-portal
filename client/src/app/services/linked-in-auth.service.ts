import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CredentialService } from './credential.service';
import { AlertsService } from "./alerts.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class LinkedInAuthService {
  private linkedInSdkLoaded = false;
  private clientId = environment.linkedinAuthConfig.clientId

  constructor(
    private router: Router,
    private alertService: AlertsService,
    private authService: AuthService,
    private credentialService: CredentialService
  ) {}

  /**
   * Dynamically loads the LinkedIn SDK script
   * @returns Promise<void>
   */
  initializeLinkedInSdk(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.linkedInSdkLoaded) {
        resolve();
        return;
      }

      const scriptId = 'linkedin-sdk';
      if (document.getElementById(scriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://platform.linkedin.com/in.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `api_key: ${this.clientId}\nauthorize: true\nonLoad: onLinkedInLoad`;

      script.onload = () => {
        this.linkedInSdkLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        console.error('LinkedIn SDK failed to load', error);
        reject(error);
      };

      document.body.appendChild(script);
    });
  }

  /**
   * Initiates the LinkedIn login flow
   * @returns Promise<any>
   */
  loginWithLinkedIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!(window as any)['IN'] || !(window as any)['IN'].User) {
        reject('LinkedIn SDK is not initialized.');
        return;
      }

      (window as any)['IN'].User.authorize(() => {
        this.fetchUserProfile()
          .then((profile) => {
            this.handleAuthResponse(profile);
            resolve(profile);
          })
          .catch((error) => reject(error));
      }, (error: string) => {
        reject('LinkedIn Authorization Failed: ' + error);
      });
    });
  }

  /**
   * Fetches the LinkedIn user profile data
   * @returns Promise<any>
   */
  fetchUserProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!(window as any)['IN'] || !(window as any)['IN'].API) {
        reject('LinkedIn API is not available.');
        return;
      }

      (window as any)['IN'].API.Profile('me')
        .fields(['id', 'firstName', 'lastName', 'emailAddress'])
        .result((data: any) => {
          resolve(data.values[0]);
        })
        .error((error: any) => {
          console.error('Error fetching LinkedIn profile', error);
          reject(error);
        });
    });
  }

  /**
   * Handles the LinkedIn authentication response
   */
  private handleAuthResponse(authResponse: any) {
    const user = {
      email: authResponse.emailAddress,
      firstName: authResponse.firstName,
      lastName: authResponse.lastName,
      username: authResponse.id,
      avatarUrl: '',
    };

    this.processUserProfile(user);
  }

  /**
   * Processes the user profile and determines login or registration
   */
  private processUserProfile(profile: any) {
    this.credentialService.fetchCredentialByEmail(profile.email).subscribe(
      (response: any) => {
        if (response) {
          this.processLogin(response);
        } else {
          this.registerLinkedInUser(profile);
        }
      },
      (error) => {
        this.alertService.errorMessage('Error while checking user: ' + error, 'Error');
      }
    );
  }

  /**
   * Registers a new user via LinkedIn data
   */
  private registerLinkedInUser(profile: any) {
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

  /**
   * Processes user login
   */
  private processLogin(user: any) {
    this.authService.createUserID(user.employeeId.toString());
    this.authService.createLevel(user.userLevel.toString());
    this.authService.unlock();
    setTimeout(() => {
      if (user.role === 'candidate') {
        this.router.navigate(['/']);
        this.alertService.successMessage('Login successful', 'Success');
      } else if (user.role === 'employer') {
        this.handleEmployerLogin(user);
      }
    }, 500);
  }

  /**
   * Handles employer-specific login actions
   */
  private handleEmployerLogin(user: any) {
    const route = user.userLevel === '2' ? '/dashboard' : '/home';
    this.router.navigate([route]);
    this.alertService.successMessage('Employer login successful', 'Success');
  }

  /**
   * Logs the user out of LinkedIn
   * @returns Promise<void>
   */
  logoutFromLinkedIn(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!(window as any)['IN'] || !(window as any)['IN'].User) {
        reject('LinkedIn SDK is not initialized.');
        return;
      }

      (window as any)['IN'].User.logout(() => {
        console.log('Logged out from LinkedIn');
        resolve();
      }, (error: string) => {
        console.error('Error logging out from LinkedIn', error);
        reject(error);
      });
    });
  }
}
