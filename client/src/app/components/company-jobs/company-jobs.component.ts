import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent {

  constructor(private router: Router) { }
  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
