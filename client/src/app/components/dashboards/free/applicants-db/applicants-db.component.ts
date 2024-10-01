import {AfterViewInit, Component, OnInit} from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-applicants-db',
  templateUrl: './applicants-db.component.html',
  styleUrls: ['./applicants-db.component.scss']
})
export class ApplicantsDbComponent implements AfterViewInit, OnInit {

  companyId: any;
  jobApplicants: any[] = [];
  constructor(
    private jobApplyService: JobApplyService,
    private router: Router,
    private cookieService: AuthService) { }


  ngOnInit(): void {
    this.companyId = this.cookieService.organization()
    this.fetchApplicants()
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  fetchApplicants(){
    this.jobApplyService.fetchJobApplyByCompanyId(this.companyId).subscribe((data: any) => {
      this.jobApplicants = data
    });
  }

  viewCandidateProfile(employeeId: any) {
    if (employeeId) {
      this.router.navigate(['/candidate-profile'], { queryParams: { id: employeeId } });
    }
  }
}
