// stripe-checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StripeCheckoutService {
  private stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

  constructor(private http: HttpClient) {}

  createStripeCheckoutSession(companyId: string, planName: string): Observable<any> {
    return this.http.post('/webhook/create-checkout-session', { companyId, planName });
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await this.stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  }

  startPayPalCheckout() {
    console.log('Redirecting to PayPal...');
  }
}
