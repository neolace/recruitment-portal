import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StripeService} from "ngx-stripe";
import {PaymentService} from "../../../services/payment/payment.service";
import {loadStripe, Stripe, StripeCardElementOptions, StripeElements, StripeElementsOptions} from "@stripe/stripe-js";
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

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  clientSecret!: string;

  elements!: StripeElements;
  paymentElementOptions: any = {
    appearance: {
      theme: 'stripe',
    },
  };
  paymentIntentId: string = '';
  stripe!: Stripe| any;
  companyId: any;
  planName: any = 'Pro';

  constructor(private alertService: AlertsService,
              private cookieService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private stripeService: StripeService,
              private paymentService: PaymentService) {
  }

  async ngOnInit() {
    this.companyId = this.cookieService.organization();
    this.stripe = await loadStripe(environment.stripe_key);
  }

  ngAfterViewInit() {
    this.createPaymentIntent();
  }

  createPaymentIntent() {
    this.paymentService.createPaymentIntent(this.companyId, this.planName).subscribe((response: any) => {
      this.clientSecret = response.clientSecret;

      this.loadPaymentElement().then(r=>{});
    }, error => {
      console.log(error);
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
    if (this.companyId){
      const result = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: 'https://talentboozt.com/thank-you',
        },
      });

      if (result.error) {
        this.alertService.errorMessage('Failed: '+result.error.message, 'error');
      } else {
        this.alertService.successMessage('Payment successful! Logout and login again to see the changes!', 'success');
      }
    } else {
      this.alertService.errorMessage('You need to register as a company first', 'error');
    }
  }

  // async pay() {
  //   if (!this.clientSecret) {
  //     console.error('Client Secret not available.');
  //     return;
  //   }
  //
  //   this.stripeService.elements().subscribe((elements) => {
  //     this.stripeService.confirmCardPayment(this.clientSecret, {
  //       payment_method: {
  //         card: elements.getElement('card') as any,
  //       },
  //       return_url: 'https://talentboozt.com/thank-you',
  //     }).subscribe((result) => {
  //       if (result.error) {
  //         console.error('Payment failed:', result.error.message);
  //       } else {
  //         console.log('Payment successful!', result.paymentIntent);
  //       }
  //     });
  //   });
  // }
}
