import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {CredentialService} from "../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertsService} from "../../services/alerts.service";

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
              private alertService: AlertsService ) {}

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
            this.alertService.successMessage('Profile Unlocked!', 'Success');
            this.router.navigate(['/']);
          } else {
            this.alertService.errorMessage('Wrong Password', 'Error');
          }
        } else {
          this.alertService.errorMessage('Please Enter Your Password', 'Error');
        }
      }
    });
  }
}
