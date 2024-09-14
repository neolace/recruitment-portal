import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-emp-saved-jobs-saved',
  templateUrl: './emp-saved-jobs-saved.component.html',
  styleUrls: ['./emp-saved-jobs-saved.component.scss']
})
export class EmpSavedJobsSavedComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
