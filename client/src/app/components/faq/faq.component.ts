import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements AfterViewInit{
  @ViewChild('buyingSec') buyingSec!: ElementRef;
  @ViewChild('generalSec') generalSec!: ElementRef;
  @ViewChild('paymentsSec') paymentsSec!: ElementRef;
  @ViewChild('supportSec') supportSec!: ElementRef;
  @ViewChild('otherSec') otherSec!: ElementRef;

  @ViewChildren('buying, general, payments, support, other') sectionButtons!: QueryList<ElementRef>;

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  private resetActiveClass() {
    this.sectionButtons.forEach(button => button.nativeElement.classList.remove('active'));
  }

  navigateSection(section: string) {
    // Scroll to the selected section
    const sectionMap: { [key: string]: ElementRef } = {
      buying: this.buyingSec,
      general: this.generalSec,
      payments: this.paymentsSec,
      support: this.supportSec,
      other: this.otherSec
    };

    sectionMap[section]?.nativeElement.scrollIntoView({ behavior: 'smooth' });

    // Update active class
    this.resetActiveClass();
    const activeButton = this.sectionButtons.find(button => button.nativeElement.id === section);
    activeButton?.nativeElement.classList.add('active');
  }
}
