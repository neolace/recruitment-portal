import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CredentialService} from "../../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {AlertsService} from "../../../services/alerts.service";
import {ThemeService} from "../../../services/theme.service";
import {EncryptionService} from "../../../services/encryption.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('candidate'),  // Default to 'candidate'
    termsCheck: new FormControl(false, [Validators.requiredTrue])
  });

  isp1open: boolean = true;
  errorMsg = '';
  termsErrorMsg = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private credentialService: CredentialService,
              private alertService: AlertsService,
              private encryptionService: EncryptionService,
              public themeService: ThemeService,
              private cookieService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['from'] === 'companies') {
        this.registerForm.patchValue({ role: 'employer' });
      } else {
        this.registerForm.patchValue({ role: 'candidate' });
      }
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  async registerUser() {
    this.errorMsg = '';
    this.termsErrorMsg = '';
    if (this.registerForm.get('termsCheck')?.invalid) {
      this.termsErrorMsg = 'Please accept the terms and conditions';
      this.alertService.errorMessage(this.termsErrorMsg, 'Missing Fields');
      return;
    }

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const password = formData.password;
      const referer = this.cookieService.getReferer() || null;
      const platform = this.cookieService.getPlatform();
      const promotion = this.cookieService.getPromotion() || null;

      if (password && password.length >= 6) {
        const isPwned = await this.encryptionService.checkLeakedPassword(password);
        if (isPwned) {
          this.alertService.errorMessage('This password has been compromised in data breaches. Please choose a different one.', 'Weak Password');
          return;
        }

        this.credentialService.register({
          firstname: formData.name?.split(' ')[0],
          lastname: formData.name?.split(' ')[1] || '',
          email: formData.email,
          password: password,
          role: formData.role,
          userLevel: formData.role === 'candidate' ? "1" : "2",
          referrerId: referer,
          platform: platform,
          promotion: promotion,
          active: true
        }).subscribe((response: any) => {
          if (!response) {
            this.alertService.errorMessage('An unexpected error has occurred', 'Unexpected Error');
            return;
          }
          if (response.accessedPlatforms?.includes(platform) && response.accessedPlatforms.includes('jobPortal')) {
            const platformsList = response.accessedPlatforms.join(', ');
            this.alertService.successMessage(`This email has been registered on the following platforms: ${platformsList}`, 'Email Already Exists');
          }
          if (formData.role === 'candidate') {
            this.router.navigate(['/candidate-profile']);
            this.cookieService.createUserID(response.employeeId);
            this.cookieService.createLevel(response.userLevel);
            this.cookieService.createAuthToken(response.token);
            this.cookieService.createRefreshToken(response.refreshToken);
          } else if (formData.role === 'employer') {
            this.router.navigate(['/dashboard']);
            this.cookieService.createUserID(response.employeeId);
            this.cookieService.createLevel(response.userLevel);
            this.cookieService.createAdmin(response.email);
            this.cookieService.createAuthToken(response.token);
            this.cookieService.createRefreshToken(response.refreshToken);
            response.organizations?.forEach((organization: any) => {
              this.cookieService.createOrganizationID(organization.jobPortal || '');
            })
          }
        }, (error: HttpErrorResponse) => {
          switch (error.status) {
            case 409:
              this.alertService.errorMessage('This email has already been registered', 'Email Already Exists');
              break;
            case 400:
              this.alertService.errorMessage('Please fill in all the required fields', 'Missing Fields');
              break;
            case 500:
              this.alertService.errorMessage('An unexpected error has occurred', 'Unexpected Error');
              break;
            default:
              this.alertService.errorMessage(error.error.message, "Code: "+error.status);
          }
        });
      } else {
        this.alertService.errorMessage('Password must be at least 6 characters long', 'Weak Password');
      }
    } else {
      this.errorMsg = 'Please fill in all the fields';
      this.alertService.errorMessage('Please fill in all required fields', 'Missing Fields');
    }
  }

  togglePasswordVisibility(){
    const input: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    if (input.type === 'password'){
      input.type = 'text';
      this.isp1open = false;
    } else {
      input.type = 'password';
      this.isp1open = true;
    }
  }
}
