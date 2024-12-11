import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  card:boolean = false;
  bank:boolean = false;
  paypal:boolean = false;

  errorMsg = '';

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
      console.log('redirect to bank payout')
    }
    if (this.card && !this.bank && !this.paypal){
      console.log('redirect to card payout')
    }
    if (this.paypal && !this.card && !this.bank){
      console.log('redirect to paypal payout')
    }
  }
}
