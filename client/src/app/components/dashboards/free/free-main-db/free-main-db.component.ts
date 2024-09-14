import {AfterViewInit, Component} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-free-main-db',
  templateUrl: './free-main-db.component.html',
  styleUrls: ['./free-main-db.component.scss']
})
export class FreeMainDbComponent implements AfterViewInit{
  progressValue = 50;
  progressMode: ProgressSpinnerMode = 'determinate';

  personalProgressValue = 90;
  personalProgressMode: ProgressSpinnerMode = 'determinate';

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
