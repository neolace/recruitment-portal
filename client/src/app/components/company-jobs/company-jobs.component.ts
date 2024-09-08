import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent implements OnInit{

  jobsDataStore: any = jobAdDataStrore;
  filteredJobs :any[] = [];
  companyId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.companyId = this.router.url.split('/')[2];
    this.filterJobs();
  }

  filterJobs(): any[] {
    this.filteredJobs = this.jobsDataStore.filter((job:any) => job.companyId === this.companyId);
    return this.filteredJobs;
  }

  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
