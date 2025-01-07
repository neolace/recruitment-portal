import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {Utilities} from "../../shared/utilities/utilities";
import {isPlatformBrowser} from "@angular/common";
import {WindowService} from "../../services/common/window.service";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements AfterViewInit{

  utilities = Utilities;

  constructor(private windowService: WindowService) {
  }

  ngAfterViewInit() {
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }
}
