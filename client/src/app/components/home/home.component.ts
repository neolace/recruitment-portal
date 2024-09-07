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

  constructor(private router: Router) { }
  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
