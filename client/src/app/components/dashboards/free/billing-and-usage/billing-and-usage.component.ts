import { Component } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillingService} from "../../../../services/payment/billing.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AlertsService} from "../../../../services/alerts.service";
import {CompanyService} from "../../../../services/company.service";

@Component({
  selector: 'app-billing-and-usage',
  templateUrl: './billing-and-usage.component.html',
  styleUrls: ['./billing-and-usage.component.scss']
})
export class BillingAndUsageComponent {

  subscriptionDetails: any;
  invoices: any[] = [];
  usageData: any;
  billingAddressForm: FormGroup;
  companyId: any;

  loading = false;
  company: any;
  postedJobs: any;

  constructor(private billingService: BillingService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private fb: FormBuilder) {
    this.billingAddressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();

    if (!this.companyId) {
      this.alertService.errorMessage('Company ID not found.', 'Error');
      return;
    }

    this.getCompany(this.companyId);
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.postedJobs = data?.postedJobs[0];
        this.loading = false;
        console.log(this.postedJobs)

        // Fetch subscription details
        this.billingService.getSubscriptionDetails(this.companyId).subscribe(
          (data) => (this.subscriptionDetails = data),
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.subscriptionDetails = null;
              this.alertService.errorMessage('Subscription details not found.', 'Error');
            }
            else {
              this.alertService.errorMessage('Error fetching subscription details.', 'Error');
            }
          }
        );

        // Fetch invoices
        this.billingService.getInvoices(this.companyId).subscribe(
          (data) => (this.invoices = data),
          (err: HttpErrorResponse) => {
            if (err.status === 404) {
              this.invoices = [];
              this.alertService.errorMessage('Invoices not found.', 'Error');
            }
            else {
              this.alertService.errorMessage('Error fetching invoices.', 'Error');
            }
          }
        );

        // Fetch usage data
        // this.billingService.getUsageData(this.companyId).subscribe(
        //   (data) => (this.usageData = data),
        //   (err: HttpErrorResponse) => {
        //     if (err.status === 404) {
        //       this.usageData = null;
        //       this.alertService.errorMessage('Usage data not found.', 'Error');
        //     }
        //     else {
        //       this.alertService.errorMessage('Error fetching usage data.', 'Error');
        //     }
        //   }
        // );
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.alertService.errorMessage('Error fetching company details.', 'Error');
      }
    )
  }

  updateBillingAddress(): void {
    const address = this.billingAddressForm.value;

    this.billingService.updateBillingAddress(this.companyId, {
      companyId: this.companyId,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country
    }).subscribe(
      () => this.alertService.successMessage('Billing address updated successfully.', 'Success'),
      (err) => {
        this.alertService.errorMessage('Error updating billing address.', 'Error');
      }
    );
  }

  calculatePercentage(used: number, allowed: number): number {
    if(allowed === Infinity) return 100
    return (used / allowed) * 100;
  }

  protected readonly Infinity = Infinity;
}
