import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StripeService} from "ngx-stripe";
import {PaymentService} from "../../../services/payment/payment.service";
import {loadStripe, Stripe, StripeElements} from "@stripe/stripe-js";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-stripe-element',
  template: `
    <div class="container">
      <div id="payment-element"></div>
      <button class="btn-1 w-100" (click)="pay()">Pay</button>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 800px;
        padding: max(40px, 5vw) 0;
      }
      #payment-element {
        margin: 20px 0;
      }
    `,
  ],
})
export class StripeElementComponent implements OnInit, AfterViewInit{
  clientSecret!: string;

  elements!: StripeElements;
  stripe!: Stripe| any;
  companyId: any;
  planName: any = 'Pro';

  isLoading = false;

  constructor(private alertService: AlertsService,
              private cookieService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private stripeService: StripeService,
              private paymentService: PaymentService) {
  }

  async ngOnInit() {
    const isVerified = sessionStorage.getItem('in_payment_progress');
    if (!isVerified) {
      this.alertService.errorMessage('We detected some suspicious activity. If you face this trouble again and again please contact support!', 'Error');
      setInterval(()=>{
        this.router.navigate(['/cart']);
      }, 5000);
    }
    this.companyId = this.cookieService.organization();
    this.stripe = await loadStripe(environment.stripe_key);
  }

  ngAfterViewInit() {
    this.createPaymentIntent();
  }

  createPaymentIntent() {
    this.isLoading = true;
    this.paymentService.createPaymentIntent(this.companyId, this.planName).subscribe((response: any) => {
      this.clientSecret = response.clientSecret;

      this.loadPaymentElement().then(r=>{this.isLoading = false;});
    }, error => {
      this.isLoading = false;
      this.alertService.errorMessage(error.error.message, 'Error');
    });
  }

  async loadPaymentElement() {
    const appearance = {
      theme: 'flat', // Other themes: 'flat', 'night', 'none'
      variables: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        colorBackground: '#f5f5f5',
        colorText: '#333',
      },
    };

    // Initialize Stripe Elements
    this.elements = this.stripe.elements({ clientSecret: this.clientSecret, appearance });

    // Create the payment element
    const paymentElement = this.elements.create('payment', {
      layout: {
        type: 'accordion', // Accordion layout
        defaultCollapsed: false,
        radios: true,
        spacedAccordionItems: true,
      },
    });

    // Mount the element to the DOM
    paymentElement.mount('#payment-element');
  }

  async pay() {
    if (this.companyId) {
      this.paymentService.createCheckoutSession(this.companyId, this.planName).subscribe((response: any) => {
        if (response) {
          this.redirectToCheckout(response.id);
        }
      }, error => {
        this.alertService.errorMessage('Failed to initiate payment. Please try again.', 'error');
      });
    } else {
      sessionStorage.removeItem('in_payment_progress');
      this.alertService.errorMessage('You need to register as a company first', 'error');
    }
  }

  async redirectToCheckout(sessionId: string) {
    const stripe: any = await loadStripe(environment.stripe_key);
    stripe.redirectToCheckout({ sessionId }).then((result: any) => {
      sessionStorage.removeItem('in_payment_progress');
      if (result.error) {
        this.alertService.errorMessage("Error redirecting to Stripe Checkout:" + result.error.message, "error");
      }
    });
  }
}
