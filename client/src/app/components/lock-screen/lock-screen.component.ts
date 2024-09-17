import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CredentialService} from "../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements AfterViewInit, OnInit{

  employeeId:any;

  unlockForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  })
  constructor(private cookieService: AuthService,
              private credentialService: CredentialService,
              private router: Router,
              private toastr: ToastrService ) {}

  ngOnInit() {
    this.cookieService.lock();
    this.employeeId = this.cookieService.userID();
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  unlockUser() {
    this.credentialService.fetchCredentialByEmployeeId(this.employeeId).subscribe((response: any) => {
      if (response) {
        if (this.unlockForm.valid) {
          if (this.unlockForm.value.password === response.password) {
            this.cookieService.unlock();
            this.successMessage('Profile Unlocked!', 'Success');
            this.router.navigate(['/']);
          } else {
            this.errorMessage('Wrong Password', 'Error');
          }
        } else {
          this.errorMessage('Please Enter Your Password', 'Error');
        }
      }
    });
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
