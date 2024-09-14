import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-business-profile-my',
  templateUrl: './business-profile-my.component.html',
  styleUrls: ['./business-profile-my.component.scss']
})
export class BusinessProfileMyComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  goSeeJobs() {
    if (this.router.url === '/dashboard/business-profile-my') {
      this.router.navigate(['/dashboard/company-jobs']);
    } else if (this.router.url === '/pro/business-profile-my') {
      this.router.navigate(['/pro/company-jobs']);
    }
  }

  goProfileSettings() {
    if (this.router.url === '/dashboard/business-profile-my') {
      this.router.navigate(['/dashboard/business-profile-settings']);
    } else if (this.router.url === '/pro/business-profile-my') {
      this.router.navigate(['/pro/business-profile-settings']);
    }
  }

}
