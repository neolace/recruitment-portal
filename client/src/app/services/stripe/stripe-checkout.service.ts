// stripe-checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class StripeCheckoutService {
  stripe_key = environment.stripeKey
  baseUrl = environment.apiUrl;
  private stripePromise = loadStripe(this.stripe_key);

  constructor(private http: HttpClient) {}

  createStripeCheckoutSession(companyId: string, planName: string): Observable<any> {
    return this.http.post(this.baseUrl+'/webhook/create-checkout-session', { companyId, planName });
  }

  async redirectToCheckout(sessionId: string) {
    const stripe = await this.stripePromise;
    await stripe?.redirectToCheckout({ sessionId });
  }

  startPayPalCheckout() {
    console.log('Redirecting to PayPal...');
  }
}
