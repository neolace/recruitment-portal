import {AfterViewInit, Component} from '@angular/core';
import {PricingUtilities} from "../../shared/utilities/pricing.utilities";

@Component({
  selector: 'app-prising',
  templateUrl: './prising.component.html',
  styleUrls: ['./prising.component.scss']
})
export class PrisingComponent implements AfterViewInit{

  utilities = PricingUtilities;

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
