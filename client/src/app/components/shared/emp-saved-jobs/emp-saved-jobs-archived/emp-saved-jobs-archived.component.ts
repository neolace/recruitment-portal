import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-emp-saved-jobs-archived',
  templateUrl: './emp-saved-jobs-archived.component.html',
  styleUrls: ['./emp-saved-jobs-archived.component.scss']
})
export class EmpSavedJobsArchivedComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
