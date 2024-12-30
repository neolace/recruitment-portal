import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {AlertsService} from "../../../services/alerts.service";
import {CartService} from "../../../services/payment/cart.service";

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

  cart = this.cartService.getCart();
  total: any = 0;

  constructor(private router: Router, private cookieService: AuthService, private alertService: AlertsService, private cartService: CartService) {
  }

  ngOnInit() {
    this.userId = this.cookieService.organization();
    if (this.userId){
      this.isVerified = true;
    }
    this.cart.forEach((item: any) => {
      this.total += item.price
    })
  }

  selectOption(option: string) {
    switch (option){
      case 'card': this.card = true; this.bank = false; this.paypal = false; break;
      case 'bank': this.bank = true; this.card = false; this.paypal = false; break;
      case 'paypal': this.paypal = true; this.card = false; this.bank = false;break;
      default: this.card = false; this.bank = false; this.paypal = false; break;
    }
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  checkout(){
    this.errorMsg = '';
    if (this.cart.length == 0 || !this.cart){
      this.alertService.errorMessage('Cart is Empty', 'error');
      return
    }
    if (!this.isVerified){
      this.alertService.errorMessage('Please login as an employer to checkout', 'error');
      return
    }
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
