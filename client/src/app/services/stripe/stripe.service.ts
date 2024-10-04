import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private readonly stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe('your-publishable-key-here');
  }

  async getStripeInstance(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
