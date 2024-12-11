import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AlertsService} from "../../../services/alerts.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  card:boolean = true;
  bank:boolean = false;
  paypal:boolean = false;

  errorMsg = '';

  userId:any;
  isVerified:boolean = false;

  constructor(private router: Router, private cookieService: AuthService, private alertService: AlertsService) {
  }

  ngOnInit() {
    this.userId = this.cookieService.userID();
    if (this.userId){
      this.isVerified = true;
    }
  }

  selectOption(option: string) {
    switch (option){
      case 'card': this.card = true; this.bank = false; this.paypal = false; break;
      case 'bank': this.bank = true; this.card = false; this.paypal = false; break;
      case 'paypal': this.paypal = true; this.card = false; this.bank = false;break;
      default: this.card = false; this.bank = false; this.paypal = false; break;
    }
  }

  checkout(){
    this.errorMsg = '';
    if (!this.bank && !this.card && !this.paypal){
      this.errorMsg = 'Please Choose a Valid Payment Option to Checkout';
      return
    }
    if (this.bank && !this.card && !this.paypal){
      this.router.navigate(['/bank-checkout'],{queryParams:{verified:this.isVerified}})
    }
    if (this.card && !this.bank && !this.paypal){
      this.router.navigate(['/card-checkout'],{queryParams:{verified:this.isVerified}})
    }
    if (this.paypal && !this.card && !this.bank){
      this.alertService.warningMessage('This feature will available soon', 'warning')
    }
  }
}
