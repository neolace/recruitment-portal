import {AfterViewInit, Component} from '@angular/core';
import {PricingUtilities} from "../../shared/utilities/pricing.utilities";
import {CartService} from "../../services/payment/cart.service";
import {Router} from "@angular/router";
import {WindowService} from "../../services/common/window.service";

@Component({
  selector: 'app-prising',
  templateUrl: './prising.component.html',
  styleUrls: ['./prising.component.scss']
})
export class PrisingComponent implements AfterViewInit{

  utilities = PricingUtilities;

  constructor(private windowService: WindowService, private cartService: CartService, private router: Router) {
  }

  ngAfterViewInit() {
    if (this.windowService.nativeWindow) {
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }

  gotoCart(cart: any, url: string) {
    this.cartService.addToCart(cart);
    this.router.navigate([url]);
  }
}
