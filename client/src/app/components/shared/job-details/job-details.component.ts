import {Component, OnInit} from '@angular/core';
import {jobAdDataStrore} from "../../../shared/data-store/JobAd-data-strore";
import {Router} from "@angular/router";


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit{

  jobDataStore: any = jobAdDataStrore;
  filteredJobDataStore: any[] = [];
  jobPostId: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.jobPostId = this.router.url.split('/')[2];
    this.filterJobData();
  }

  filterJobData(): any[] {
    this.filteredJobDataStore = this.jobDataStore.filter((job: any) => job.id === this.jobPostId);
    return this.filteredJobDataStore;
  }
}
