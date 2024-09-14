import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-emp-profile-settings-test',
  templateUrl: './emp-profile-settings-test.component.html',
  styleUrls: ['./emp-profile-settings-test.component.scss']
})
export class EmpProfileSettingsTestComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
