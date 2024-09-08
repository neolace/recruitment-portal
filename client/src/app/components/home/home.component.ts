import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";
import {companyDataStore} from "../../shared/data-store/company-data-store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  heart: boolean = false; // test
  jobAdDataStrore: any = jobAdDataStrore;

  companyDataStore: any = companyDataStore;

  jobSearch: string = '';
  locationSearch: string = '';

  constructor(private router: Router) { }
  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }

  makeSearchQuery() {
    if (this.jobSearch === '' && this.locationSearch === '') {
      this.router.navigate(['/job']);
      return;
    } else if (this.jobSearch === '') {
      this.router.navigate(['/job'], {queryParams: {locationSearch: this.locationSearch}});
      return;
    } else if (this.locationSearch === '') {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch}});
      return;
    } else {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch, locationSearch: this.locationSearch}});
      return;
    }
  }
}
