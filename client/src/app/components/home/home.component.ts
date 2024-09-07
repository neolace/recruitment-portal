import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  heart: boolean = true; // test
  jobAdDataStrore: any = jobAdDataStrore;

  constructor(private router: Router) { }
  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
