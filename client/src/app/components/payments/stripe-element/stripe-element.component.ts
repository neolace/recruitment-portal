import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StripeService} from "ngx-stripe";
import {PaymentService} from "../../../services/payment/payment.service";
import {StripeCardElementOptions, StripeElements, StripeElementsOptions} from "@stripe/stripe-js";

@Component({
  selector: 'app-stripe-element',
  templateUrl: './stripe-element.component.html',
  styleUrls: ['./stripe-element.component.scss']
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

  constructor(private alertService: AlertsService,
              private router: Router,
              private route: ActivatedRoute,
              private stripeService: StripeService,
              private paymentService: PaymentService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createPaymentIntent();
  }

  createPaymentIntent() {
    this.paymentService.createPaymentIntent().subscribe((response: any) => {
      this.clientSecret = response.clientSecret;

      // this.loadPaymentElement().then(r=>{});
    }, error => {
      console.log(error);
    });
  }

  async loadPaymentElement() {
    try {
      console.log('Initializing Stripe Elements...');
      const { elements, error }: any = await this.stripeService.elements({
        clientSecret: this.clientSecret,
      }).toPromise();

      if (error) {
        console.error('Stripe Elements initialization error:', error.message);
        return;
      }

      this.elements = elements;
      console.log('Stripe Elements initialized:', this.elements);

      const paymentElement = this.elements?.create('payment', this.paymentElementOptions);

      if (!paymentElement) {
        console.error('Failed to create payment element.');
        return;
      }

      paymentElement.mount('#payment-element');
      console.log('Payment Element mounted successfully.');
    } catch (err) {
      console.error('Unexpected error during Stripe Elements initialization:', err);
    }
  }

  async pay() {
    if (!this.clientSecret) {
      console.error('Client Secret not available.');
      return;
    }

    this.stripeService.elements().subscribe((elements) => {
      this.stripeService.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: elements.getElement('card') as any,
        },
        return_url: 'https://talentboozt.com/thank-you',
      }).subscribe((result) => {
        if (result.error) {
          console.error('Payment failed:', result.error.message);
        } else {
          console.log('Payment successful!', result.paymentIntent);
        }
      });
    });
  }
}
