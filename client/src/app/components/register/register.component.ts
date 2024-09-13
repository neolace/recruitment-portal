import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CredentialService} from "../../services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('candidate'),  // Default to 'candidate'
    termsCheck: new FormControl(false, [Validators.requiredTrue])
  });

  constructor(private router: Router, private route: ActivatedRoute, private credentialService: CredentialService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['from'] === 'companies') {
        this.registerForm.patchValue({ role: 'employer' });
      } else {
        this.registerForm.patchValue({ role: 'candidate' });
      }
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
        userLevel: 1
      }).subscribe((response: any) => {
        if (!response) {
          console.log("User already exists or something went wrong");
          return;
        }
        if (formData.role === 'candidate') {
          this.router.navigate(['/']);
        } else if (formData.role === 'employer') {
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        console.log(error);
      });
    } else {
      console.log("Form is invalid");
    }
  }
}
