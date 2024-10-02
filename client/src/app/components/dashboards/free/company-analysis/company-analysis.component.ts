import { Component } from '@angular/core';
import {JobApplyService} from "../../../../services/job-apply.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ThemeService} from "../../../../services/theme.service";

declare var bootstrap: any;
@Component({
  selector: 'app-company-analysis',
  templateUrl: './company-analysis.component.html',
  styleUrls: ['./company-analysis.component.scss']
})
export class CompanyAnalysisComponent {

  companyId: any;
  jobApplicants: any[] = [];

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(
    private jobApplyService: JobApplyService,
    private router: Router,
    public themeService: ThemeService,
    private cookieService: AuthService) { }

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.fetchApplicants();
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

  fetchApplicants() {
    this.loading = true;
    this.jobApplyService.fetchJobApplyByCompanyId(this.companyId).subscribe((data: any) => {
      this.jobApplicants = data?.map((job: any) => ({
        ...job,
        showAllApplicants: false
      }));
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      // Check for different error types
      if (error.status === 404) {
        this.notFound = true;
      } else if (error.status === 500) {
        this.serverError = true;
      } else if (error.status === 0) {
        this.corsError = true;
      } else if (error.status === 403) {
        this.forbidden = true;
      } else {
        this.unexpectedError = true;
      }

      this.loading = false;
    });
  }
}
