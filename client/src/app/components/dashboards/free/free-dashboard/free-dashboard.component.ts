import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-free-dashboard',
  templateUrl: './free-dashboard.component.html',
  styleUrls: ['./free-dashboard.component.scss']
})
export class FreeDashboardComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
