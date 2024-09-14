import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-emp-saved-jobs-applied',
  templateUrl: './emp-saved-jobs-applied.component.html',
  styleUrls: ['./emp-saved-jobs-applied.component.scss']
})
export class EmpSavedJobsAppliedComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
