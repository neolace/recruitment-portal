import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StripeService} from "ngx-stripe";
import {StripeElements} from "@stripe/stripe-js";
import {PaymentService} from "../../../services/payment/payment.service";

@Component({
  selector: 'app-card-checkout',
  templateUrl: './card-checkout.component.html',
  styleUrls: ['./card-checkout.component.scss']
})
export class CardCheckoutComponent implements OnInit{

  elements!: StripeElements;
  paymentElementOptions: any = {};
  paymentIntentId: string = '';

  billingForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+\d{1,3}\s?\d{1,14}$/)])
  })

  constructor(private alertService: AlertsService,
              private router: Router,
              private route: ActivatedRoute,
              private stripeService: StripeService,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['verified'] !== 'true') {
        this.alertService.errorMessage('We detected some suspicious activity. If you face this trouble again and again please contact support!', 'Error');
        setInterval(()=>{
          this.router.navigate(['/cart']);
        }, 5000);
      } else {
        this.createPaymentIntent()
      }
    });
  }

  createPaymentIntent() {
    this.paymentService.createPaymentIntent().subscribe((response: any) => {
      this.paymentIntentId = response.clientSecret;

      this.loadPaymentElement().then();
    }, error => {
      console.log(error);
    });
  }

  cancel(){
    this.router.navigate(['/cart']);
  }

  async loadPaymentElement() {
    const { error, elements }:any = await this.stripeService.elements({
      clientSecret: this.paymentIntentId
    }).toPromise();

    if (error) {
      console.error(error);
      return;
    }

    this.elements = elements!;
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  }

  async pay() {
    const { error }: any = await this.stripeService.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: 'https://your-site.com/thank-you', // Optional: Redirect after success
      }
    }).toPromise();

    if (error) {
      console.error(error.message);
    } else {
      alert('Payment successful!');
    }
  }

  // pay(){
  //   if (this.billingForm.valid){
  //     this.router.navigate(['/thank-you']);
  //     this.alertService.warningMessage('This feature will available soon', 'warning');
  //   }
  //   else {
  //     this.alertService.errorMessage('All Fields are required', 'error');
  //   }
  // }

}
