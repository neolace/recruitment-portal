import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CredentialService} from "../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AlertsService} from "../../services/alerts.service";

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private credentialService: CredentialService,
              private alertService: AlertsService,
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

  registerUser() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.credentialService.addCredential({
        firstname: formData.name?.split(' ')[0],
        lastname: formData.name?.split(' ')[1] || '',
        email: formData.email,
        password: formData.password,
        role: formData.role,
        userLevel: formData.role === 'candidate' ? "1" : "2",
      }).subscribe((response: any) => {
        if (!response) {
          this.alertService.errorMessage('User already exists or an unexpected error has occurred', 'Unexpected Error');
          return;
        }
        if (formData.role === 'candidate') {
          this.router.navigate(['/']);
          this.cookieService.createUserID(response.employeeId);
          this.cookieService.createLevel(response.userLevel);
        } else if (formData.role === 'employer') {
          this.router.navigate(['/dashboard']);
          this.cookieService.createUserID(response.employeeId);
          this.cookieService.createLevel(response.userLevel);
          this.cookieService.createAdmin(response.email);
          this.cookieService.createOrganizationID(response.companyId);
        }
      }, error => {
        this.alertService.errorMessage('User already exists or an unexpected error has occurred', 'Unexpected Error');
      });
    } else {
      this.alertService.errorMessage('Please fill in all required fields', 'Missing Fields');
    }
  }
}
