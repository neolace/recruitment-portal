import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-prising',
  templateUrl: './prising.component.html',
  styleUrls: ['./prising.component.scss']
})
export class PrisingComponent implements AfterViewInit{

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }
}
