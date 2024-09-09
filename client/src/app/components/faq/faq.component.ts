import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
@ViewChild('buying') buying!: ElementRef;
@ViewChild('general') general!: ElementRef;
@ViewChild('payments') payments!: ElementRef;
@ViewChild('support') support!: ElementRef;
@ViewChild('other') other!: ElementRef;
@ViewChild('buyingSec') buyingSec!: ElementRef;
@ViewChild('generalSec') generalSec!: ElementRef;
@ViewChild('paymentsSec') paymentsSec!: ElementRef;
@ViewChild('supportSec') supportSec!: ElementRef;
@ViewChild('otherSec') otherSec!: ElementRef;

  navigateSection(section: string) {
    switch (section) {
      case 'buying':
        this.buyingSec.nativeElement.scrollIntoView({behavior: 'smooth'});
        this.buying.nativeElement.classList.add('active');
        this.general.nativeElement.classList.remove('active');
        this.payments.nativeElement.classList.remove('active');
        this.support.nativeElement.classList.remove('active');
        this.other.nativeElement.classList.remove('active');
        break;
      case 'general':
        this.generalSec.nativeElement.scrollIntoView({behavior: 'smooth'});
        this.general.nativeElement.classList.add('active');
        this.buying.nativeElement.classList.remove('active');
        this.payments.nativeElement.classList.remove('active');
        this.support.nativeElement.classList.remove('active');
        this.other.nativeElement.classList.remove('active');
        break;
      case 'payments':
        this.paymentsSec.nativeElement.scrollIntoView({behavior: 'smooth'});
        this.payments.nativeElement.classList.add('active');
        this.buying.nativeElement.classList.remove('active');
        this.general.nativeElement.classList.remove('active');
        this.support.nativeElement.classList.remove('active');
        this.other.nativeElement.classList.remove('active');
        break;
      case 'support':
        this.supportSec.nativeElement.scrollIntoView({behavior: 'smooth'});
        this.support.nativeElement.classList.add('active');
        this.buying.nativeElement.classList.remove('active');
        this.general.nativeElement.classList.remove('active');
        this.payments.nativeElement.classList.remove('active');
        this.other.nativeElement.classList.remove('active');
        break;
      case 'other':
        this.otherSec.nativeElement.scrollIntoView({behavior: 'smooth'});
        this.other.nativeElement.classList.add('active');
        this.buying.nativeElement.classList.remove('active');
        this.general.nativeElement.classList.remove('active');
        this.payments.nativeElement.classList.remove('active');
        this.support.nativeElement.classList.remove('active');
        break;
      default:
        break;
    }
  }
}
