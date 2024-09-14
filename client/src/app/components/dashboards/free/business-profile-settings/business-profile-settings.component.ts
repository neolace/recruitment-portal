import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-business-profile-settings',
  templateUrl: './business-profile-settings.component.html',
  styleUrls: ['./business-profile-settings.component.scss']
})
export class BusinessProfileSettingsComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
