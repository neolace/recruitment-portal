import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-company-jobs-my',
  templateUrl: './company-jobs-my.component.html',
  styleUrls: ['./company-jobs-my.component.scss']
})
export class CompanyJobsMyComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
