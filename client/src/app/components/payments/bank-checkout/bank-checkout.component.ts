import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../services/file-upload.service";
import {BillingService} from "../../../services/payment/billing.service";
import {AuthService} from "../../../services/auth.service";
import {CommonService} from "../../../services/common/common.service";

@Component({
  selector: 'app-bank-checkout',
  templateUrl: './bank-checkout.component.html',
  styleUrls: ['./bank-checkout.component.scss']
})
export class BankCheckoutComponent {
  billingForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  })

  loading: boolean = false;
  downloadURL?: any;
  companyId: any

  constructor(private alertService: AlertsService,
              private cookieService: AuthService,
              private billingService: BillingService,
              private commonService: CommonService,
              private router: Router,
              private route: ActivatedRoute,
              private fileUploadService: FileUploadService,) {
  }

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.route.queryParams.subscribe(params => {
      if (params['verified'] !== 'true') {
        this.alertService.errorMessage('We detected some suspicious activity. If you face this trouble again and again please contact support!', 'Error');
        setInterval(()=>{
          this.router.navigate(['/cart']);
        }, 5000);
      }
    });
  }

  cancel(){
    this.router.navigate(['/cart']);
  }

  pay(){
    if(this.downloadURL){
      if (this.billingForm.valid){
        this.billingService.savePrePaymentData({
          companyId: this.companyId,
          firstname: this.billingForm.get('fname')?.value,
          lastname: this.billingForm.get('lname')?.value,
          country: this.billingForm.get('country')?.value,
          address: this.billingForm.get('address')?.value,
          phone: this.billingForm.get('phone')?.value,
          payType: 'bank',
          status: 'pending',
          slipUrl: this.downloadURL
        }).subscribe((res: any) => {
          if (res){
            this.commonService.requestBankPayment({
              companyId: this.companyId,
              name: this.billingForm.get('fname')?.value + ' ' + this.billingForm.get('lname')?.value,
              country: this.billingForm.get('country')?.value,
              address: this.billingForm.get('address')?.value,
              phone: this.billingForm.get('phone')?.value,
              slipUrl: this.downloadURL
            }).subscribe((res: any) => {
              this.router.navigate(['/thank-you']);
              this.alertService.successMessage("We Received your payment request and will get back to you soon.", "Success");
            }, (err: any) => {
              this.alertService.errorMessage('Something went wrong. Please try again.', 'error');
            })
          } else {
            this.alertService.errorMessage('Something went wrong. Please try again.', 'error');
          }
        }, (err: any) => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'error');
        })
      }
      else {
        this.alertService.errorMessage('All Fields are required', 'error');
      }
    }
    else {
      this.alertService.errorMessage('Payment Slip is not Attached!', 'error');
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  uploadFile(event: any, filePath: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 1.5MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG and JPEG files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.loading = false;
        this.downloadURL = url;
        this.alertService.successMessage('Successfully uploaded banner.', 'Success');
      }, () => {
        this.loading = false;
        this.alertService.errorMessage('Failed to upload file. Please try again.', 'Error');
      });
    }
  }
}
