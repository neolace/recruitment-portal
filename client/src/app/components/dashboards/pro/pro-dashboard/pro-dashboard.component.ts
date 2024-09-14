import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-pro-dashboard',
  templateUrl: './pro-dashboard.component.html',
  styleUrls: ['./pro-dashboard.component.scss']
})
export class ProDashboardComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
