import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-emp-saved-jobs-inprogress',
  templateUrl: './emp-saved-jobs-inprogress.component.html',
  styleUrls: ['./emp-saved-jobs-inprogress.component.scss']
})
export class EmpSavedJobsInprogressComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
