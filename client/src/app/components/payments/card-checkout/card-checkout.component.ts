import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-card-checkout',
  templateUrl: './card-checkout.component.html',
  styleUrls: ['./card-checkout.component.scss']
})
export class CardCheckoutComponent implements OnInit{

  billingForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+?\d{1,3})?(?:0\d{1,3})?\d{7,14}$/)])
  })

  constructor(private alertService: AlertsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.billingForm.get('phone')?.valueChanges.subscribe(value => {
      if (value) {
        const sanitizedValue = value.replace(/\s+/g, ''); // Remove all spaces
        this.billingForm.get('phone')?.setValue(sanitizedValue, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['verified'] !== 'true') {
        this.alertService.errorMessage('We detected some suspicious activity. If you face this trouble again and again please contact support!', 'Error');
        setInterval(()=>{
          this.router.navigate(['/cart']);
        }, 5000);
      }
    });
  }

  cancel(){
    this.router.navigate(['/cart']);
  }

  pay(){
    if (this.billingForm.valid){
      this.router.navigate(['/pay']);
    }
    else {
      this.alertService.errorMessage('All Fields are required or Phone number is not valid', 'error');
    }
  }

}
