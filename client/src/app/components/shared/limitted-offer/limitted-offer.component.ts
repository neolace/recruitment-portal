import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CredentialService} from "../../../services/credential.service";
import {AlertsService} from "../../../services/alerts.service";
import {EncryptionService} from "../../../services/encryption.service";
import {ThemeService} from "../../../services/theme.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-limitted-offer',
  templateUrl: './limitted-offer.component.html',
  styleUrls: ['./limitted-offer.component.scss']
})
export class LimittedOfferComponent implements OnInit{

  hours = 10;
  minutes = 25;
  seconds = 50;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    termsCheck: new FormControl(false, [Validators.requiredTrue])
  });

  isp1open: boolean = true;
  errorMsg = '';
  termsErrorMsg = '';

  isOfferActive = false;
  seatsLeft = 0;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private credentialService: CredentialService,
              private alertService: AlertsService,
              private encryptionService: EncryptionService,
              public themeService: ThemeService,
              private cookieService: AuthService) { }

  ngOnInit(): void {
    this.loadAllUsers();
    setInterval(() => {
      this.countDown();
    },1000);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  loadAllUsers(){
    this.credentialService.fetchCredentials().subscribe((response: any) => {
      let users: any;
      users = response.filter((user: any) => user.userLevel === '3');
      this.seatsLeft = 30 - users.length;
      if (this.seatsLeft > 0 && this.seatsLeft <= 30) {
        this.isOfferActive = true;
      }
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

    if (this.seatsLeft <= 0) {
      this.alertService.errorMessage('This offer is no longer available', 'Offer Expired');
      return;
    }

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const password = formData.password;

      if (password && password.length >= 6) {
        const isPwned = await this.encryptionService.checkLeakedPassword(password);
        if (isPwned) {
          this.alertService.errorMessage('This password has been compromised in data breaches. Please choose a different one.', 'Weak Password');
          return;
        }

        const encryptedPassword = await this.encryptionService.encryptPassword(password);

        this.credentialService.addCredential({
          firstname: formData.name?.split(' ')[0],
          lastname: formData.name?.split(' ')[1] || '',
          email: formData.email,
          password: encryptedPassword,
          role: 'employer',
          userLevel: '3',
        }).subscribe((response: any) => {
          if (!response) {
            this.alertService.errorMessage('User already exists or an unexpected error has occurred', 'Unexpected Error');
            return;
          }
          this.router.navigate(['/dashboard']);
          this.cookieService.createUserID(response.employeeId);
          this.cookieService.createLevel(response.userLevel);
          this.cookieService.createAdmin(response.email);
          this.cookieService.createOrganizationID(response.companyId);
        }, error => {
          this.alertService.errorMessage('User already exists or an unexpected error has occurred', 'Unexpected Error');
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

  countDown() {
    if (this.seconds > 0) {
      this.seconds--
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    } else if (this.hours > 0) {
      this.hours--;
      this.minutes = 59;
      this.seconds = 59;
    }
  }
}
