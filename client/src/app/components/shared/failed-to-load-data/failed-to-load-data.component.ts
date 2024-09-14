import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-failed-to-load-data',
  templateUrl: './failed-to-load-data.component.html',
  styleUrls: ['./failed-to-load-data.component.scss']
})
export class FailedToLoadDataComponent implements OnInit {

  delay = 1000;

  isVisible: boolean = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, this.delay);
  }
}
