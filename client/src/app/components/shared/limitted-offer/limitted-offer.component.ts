import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-limitted-offer',
  templateUrl: './limitted-offer.component.html',
  styleUrls: ['./limitted-offer.component.scss']
})
export class LimittedOfferComponent implements OnInit{

  hours = 10;
  minutes = 25;
  seconds = 50;

  ngOnInit(): void {
    setInterval(() => {
      this.countDown();
    },1000);
  }

  countDown() {
    if (this.seconds > 0) {
      this.seconds--
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    } else if (this.hours > 0) {
      this.hours--;
      this.minutes = 59;
      this.seconds = 59;
    }
  }
}
