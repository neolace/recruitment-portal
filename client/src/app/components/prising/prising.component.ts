import {AfterViewInit, Component} from '@angular/core';
import {PricingUtilities} from "../../shared/utilities/pricing.utilities";
import {CartService} from "../../services/payment/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-prising',
  templateUrl: './prising.component.html',
  styleUrls: ['./prising.component.scss']
})
export class PrisingComponent implements AfterViewInit{

  utilities = PricingUtilities;

  constructor(private cartService: CartService, private router: Router) {
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  gotoCart(cart: any, url: string) {
    this.cartService.addToCart(cart);
    this.router.navigate([url]);
  }
}
