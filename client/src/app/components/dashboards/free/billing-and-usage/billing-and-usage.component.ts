import { Component } from '@angular/core';
import {subscriptionDataStore} from "../../../../shared/data-store/payment/subscription-data-store";
import {usageDataDataStore} from "../../../../shared/data-store/payment/usage-data-data-store";
import {billingHistoryDataStore} from "../../../../shared/data-store/payment/billing-history-data-srore";
import {paymentMethodsDataStore} from "../../../../shared/data-store/payment/payment-methods-data-store";
import {PaymentMethodsModel} from "../../../../shared/data-models/payment/PaymentMethods.model";
import {SubscriptionModel} from "../../../../shared/data-models/payment/Subscription.model";
import {BillingHistoryModel} from "../../../../shared/data-models/payment/BillingHistory.model";
import {UsageDataModel} from "../../../../shared/data-models/payment/UsageData.model";
import {BillingUsageService} from "../../../../services/payment/billing-usage.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-billing-and-usage',
  templateUrl: './billing-and-usage.component.html',
  styleUrls: ['./billing-and-usage.component.scss']
})
export class BillingAndUsageComponent {

  // subscription: any = subscriptionDataStore;
  // usage: any = usageDataDataStore;
  // billingHistory: any = billingHistoryDataStore;
  // paymentMethods: any = paymentMethodsDataStore;

  subscription: SubscriptionModel | any;
  usage: UsageDataModel | any;
  billingHistory: BillingHistoryModel[] | any;
  paymentMethods: PaymentMethodsModel[] | any;

  companyId: any;

  constructor(private billingService: BillingUsageService, private cookiesService: AuthService) { }

  ngOnInit(): void {
    this.companyId = this.cookiesService.organization();

    this.loadSubscription();
    this.loadUsage();
    this.loadBillingHistory();
    this.loadPaymentMethods();
  }

  // Fetch subscription details
  loadSubscription(): void {
    this.billingService.getSubscription(this.companyId).subscribe({
      next: (data: SubscriptionModel) => {
        this.subscription = data;
      },
      error: (error) => {
        console.error('Error loading subscription', error);
      }
    });
  }

  // Fetch usage data
  loadUsage(): void {
    this.billingService.getUsage(this.companyId).subscribe({
      next: (data: UsageDataModel) => {
        this.usage = data;
      },
      error: (error) => {
        console.error('Error loading usage', error);
      }
    });
  }

  // Fetch billing history
  loadBillingHistory(): void {
    this.billingService.getBillingHistory(this.companyId).subscribe({
      next: (data: BillingHistoryModel[]) => {
        this.billingHistory = data;
      },
      error: (error) => {
        console.error('Error loading billing history', error);
      }
    });
  }

  // Fetch payment methods
  loadPaymentMethods(): void {
    this.billingService.getPaymentMethods(this.companyId).subscribe({
      next: (data: PaymentMethodsModel[]) => {
        this.paymentMethods = data;
      },
      error: (error) => {
        console.error('Error loading payment methods', error);
      }
    });
  }

  // Example of upgrading or downgrading a plan
  openUpgradePlan(): void {
    const updatedSubscription: SubscriptionModel = {
      ...this.subscription,
      plan_name: 'Premium', // Simulating plan upgrade
      cost: 49.99
    };

    this.billingService.updateSubscription(this.companyId, updatedSubscription).subscribe({
      next: () => {
        this.loadSubscription(); // Reload the subscription data after update
      },
      error: (error) => {
        console.error('Error updating subscription', error);
      }
    });
  }

  // Example of managing payment methods
  openManagePaymentMethods(): void {
    const newPaymentMethod: PaymentMethodsModel = {
      id: '2',
      type: 'Credit Card',
      last_four: '1234',
      expiry_date: '2026-01-01'
    };

    this.billingService.updatePaymentMethod(this.companyId, newPaymentMethod).subscribe({
      next: () => {
        this.loadPaymentMethods(); // Reload payment methods after update
      },
      error: (error) => {
        console.error('Error updating payment method', error);
      }
    });
  }

  // Utility function to calculate percentage for progress bars
  calculatePercentage(used: number, allowed: number): number {
    return (used / allowed) * 100;
  }
}
