import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {JobApplyService} from "../../../services/job-apply.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-job-post-analysis',
  templateUrl: './single-job-post-analysis.component.html',
  styleUrls: ['./single-job-post-analysis.component.scss']
})
export class SingleJobPostAnalysisComponent implements AfterViewInit, OnInit {
  jobId: any;
  jobData: any[] = [{
    applicants : [],
    companyId: '',
    jobDescription: '',
    id: '',
    jobId:'',
    viewers: [],
  }];

  constructor(private jobApplyService: JobApplyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = params['id'];
    })
    this.fetchJobData();
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  fetchJobData() {
    this.jobApplyService.fetchJobApplyByJobId(this.jobId).subscribe((data: any) => {
      this.jobData = data?.filter((data: any) => data != null);
    });
  }
}
