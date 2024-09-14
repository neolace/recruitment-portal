import {AfterViewInit, Component} from '@angular/core';
import {countries} from "../../../../shared/data-store/countries";

@Component({
  selector: 'app-personal-profile-settings',
  templateUrl: './personal-profile-settings.component.html',
  styleUrls: ['./personal-profile-settings.component.scss']
})
export class PersonalProfileSettingsComponent implements AfterViewInit{

  countriesSet: any[] = countries

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
