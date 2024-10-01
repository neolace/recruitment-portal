import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialService} from "../../services/credential.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AlertsService} from "../../services/alerts.service";
import {GoogleAuthService} from "../../services/google-auth.service";
import {SocialAuthApiService} from "../../services/social-auth-api.service";
import {GitHubAuthService} from "../../services/git-hub-auth.service";
import {ThemeService} from "../../services/theme.service";
import {EncryptionService} from "../../services/encryption.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit, OnInit {

  attempts = 4;
  disabled: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private credentialService: CredentialService,
    private googleAuthService: GoogleAuthService,
    private gitHubAuthService: GitHubAuthService,
    private socialAuthService: SocialAuthApiService,
    private encryptionService: EncryptionService,
    private cookieService: AuthService,
    public themeService: ThemeService,
    private alertService: AlertsService) { }

  ngOnInit() {
    this.googleAuthService.configureOAuth();
    this.gitHubAuthService.handleRedirectCallback();
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  loginUser() {
    this.attempts --;
    if (this.loginForm.valid) {
      if (this.attempts <= 0 || sessionStorage.getItem('LgnAtT') == '0'){
        sessionStorage.setItem('LgnAtT', '0');
        this.alertService.warningMessage('Too many attempts! Try again in 5 minutes', 'Warning');
        this.loginForm.reset();
        this.disabled = true;
        setTimeout(()=>{
          this.attempts = 4;
          sessionStorage.removeItem('LgnAtT');
          this.disabled = false;
        }, 1000 * 60 * 5);
        return;
      }

      const formData = this.loginForm.value;
      this.credentialService.fetchCredentialByEmail(formData.email).subscribe((response: any) => {
        if (!response) {
          this.alertService.errorMessage('User doesn\'t exist or something went wrong', 'Error');
          return;
        }

        const encryptedPassword = this.encryptionService.decryptPassword(response.password.toString());

        if (sessionStorage.getItem('LgnAtT') != '0'){
          if (formData.password === encryptedPassword) {
            this.cookieService.createSession(response);
            if (response.role === 'candidate') {
              this.cookieService.createUserID(response.employeeId);
              this.cookieService.createLevel(response.userLevel);
              this.cookieService.unlock();
              this.router.navigate(['/']);
              this.alertService.successMessage('Login successful', 'Success');
            } else if (response.role === 'employer') {
              if (response.userLevel === "2") {
                this.cookieService.createUserID(response.employeeId);
                this.cookieService.createAdmin(response.email);
                this.cookieService.createOrganizationID(response.companyId);
                this.cookieService.createLevel(response.userLevel);
                this.cookieService.unlock();
                this.router.navigate(['/dashboard']);
              }
              else if (response.userLevel === "3") {
                this.cookieService.createUserID(response.employeeId);
                this.cookieService.createProAdmin(response.email);
                this.cookieService.createOrganizationID(response.companyId);
                this.cookieService.createLevel(response.userLevel);
                this.cookieService.unlock();
                this.router.navigate(['/pro']);
              }
            }
          } else {
            this.alertService.errorMessage('Wrong password', 'Error');
          }
        } else {
          this.alertService.errorMessage('Too many attempts! Try again in 5 minutes', 'Warning');
        }

      }, error => {
        this.alertService.errorMessage('Something went wrong', 'Error');
      });
    } else {
      this.alertService.errorMessage('Form is not valid', 'Error');
    }
  }

  loginWithGoogle(): void {
    this.googleAuthService.loginWithGoogle();
  }

  loginWithGithub() {
    this.gitHubAuthService.loginWithGitHub();
  }

  loginWithLinkedin() {

  }

  loginWithFacebook() {

  }
}
