import { Component } from '@angular/core';
import {subscriptionDataStore} from "../../../../shared/data-store/payment/subscription-data-store";
import {usageDataDataStore} from "../../../../shared/data-store/payment/usage-data-data-store";
import {billingHistoryDataStore} from "../../../../shared/data-store/payment/billing-history-data-srore";
import {paymentMethodsDataStore} from "../../../../shared/data-store/payment/payment-methods-data-store";

@Component({
  selector: 'app-billing-and-usage',
  templateUrl: './billing-and-usage.component.html',
  styleUrls: ['./billing-and-usage.component.scss']
})
export class BillingAndUsageComponent {

  subscription: any = subscriptionDataStore;

  usage: any = usageDataDataStore;

  billingHistory: any = billingHistoryDataStore;

  paymentMethods: any = paymentMethodsDataStore;

  constructor() { }

  ngOnInit(): void { }

  calculatePercentage(used: number, allowed: number): number {
    return (used / allowed) * 100;
  }

  openUpgradePlan(): void {
    // Implement logic to open upgrade/downgrade modal
  }

  openManagePaymentMethods(): void {
    // Implement logic to open payment methods modal
  }
}
