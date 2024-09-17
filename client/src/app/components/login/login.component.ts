import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialService} from "../../services/credential.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private credentialService: CredentialService,
    private cookieService: AuthService,
    private toastr: ToastrService) { }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.credentialService.fetchCredentialByEmail(formData.email).subscribe((response: any) => {
        if (!response) {
          this.errorMessage('User doesn\'t exist or something went wrong', 'Error');
          return;
        }
        if (formData.password === response.password) {
          if (response.role === 'candidate') {
            this.cookieService.createUserID(response.employeeId);
            this.cookieService.createLevel(response.userLevel);
            this.cookieService.unlock();
            this.router.navigate(['/']);
            this.successMessage('Login successful', 'Success');
          } else if (response.role === 'employer') {
            if (response.userLevel === "2") {
              this.cookieService.createUserID(response.employeeId);
              this.cookieService.createAdmin(response.email);
              this.cookieService.createOrganizationID(response.organizationId);
              this.cookieService.createLevel(response.userLevel);
              this.cookieService.unlock();
              this.router.navigate(['/dashboard']);
            }
            else if (response.userLevel === "3") {
              this.cookieService.createUserID(response.employeeId);
              this.cookieService.createProAdmin(response.email);
              this.cookieService.createOrganizationID(response.organizationId);
              this.cookieService.createLevel(response.userLevel);
              this.cookieService.unlock();
              this.router.navigate(['/pro']);
            }
          }
        } else {
          this.errorMessage('Wrong password', 'Error');
        }
      }, error => {
        this.errorMessage('Something went wrong', 'Error');
      });
    } else {
      this.errorMessage('Form is not valid', 'Error');
    }
  }

  successMessage(msg: string, title: string) {
    this.toastr.success(msg, title, {
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(msg: string, title: string) {
    this.toastr.error(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  warningMessage(msg: string, title: string) {
    this.toastr.warning(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
