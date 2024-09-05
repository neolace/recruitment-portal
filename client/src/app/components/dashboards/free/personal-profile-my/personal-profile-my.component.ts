import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-personal-profile-my',
  templateUrl: './personal-profile-my.component.html',
  styleUrls: ['./personal-profile-my.component.scss']
})
export class PersonalProfileMyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {}

  gotoSettings() {
    if (this.router.url === '/dashboard/personal-profile') {
      this.router.navigate(['/dashboard/personal-profile-settings']);
    } else if (this.router.url === '/pro/personal-profile') {
      this.router.navigate(['/pro/personal-profile-settings']);
    }
  }
}
