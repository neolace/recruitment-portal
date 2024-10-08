import { Component, Input } from '@angular/core';
import { StripeCheckoutService } from '../../../services/stripe/stripe-checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  @Input() companyId: any;
  @Input() planName: any;

  selectedPaymentMethod: string = 'stripe'; // Default to Stripe
  isLoading: boolean = false; // For showing loading spinner

  constructor(private stripeCheckoutService: StripeCheckoutService) {}

  // Start the checkout process
  startCheckout() {
    if (this.selectedPaymentMethod === 'stripe') {
      this.isLoading = true; // Show loader
      this.stripeCheckoutService.createStripeCheckoutSession(this.companyId, this.planName)
        .subscribe(
          (session: any) => {
            this.stripeCheckoutService.redirectToCheckout(session.id).then(r => {
              this.isLoading = false; // Hide loader
            });
          },
          (error) => {
            console.error('Error creating Stripe session:', error);
            this.isLoading = false; // Hide loader if error
          }
        );
    }
  }

  // Start PayPal checkout (just a placeholder for now)
  startPayPalCheckout() {
    console.log('Redirecting to PayPal...');
    this.isLoading = false; // Disable loader for PayPal as it's not implemented yet
    // Implement PayPal checkout logic here
  }
}
