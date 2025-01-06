import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {CompanyService} from "../../../../services/company.service";
import { HttpErrorResponse } from "@angular/common/http";
import {EmployeeService} from "../../../../services/employee.service";
import {AlertsService} from "../../../../services/alerts.service";

@Component({
  selector: 'app-business-profile-my',
  templateUrl: './business-profile-my.component.html',
  styleUrls: ['./business-profile-my.component.scss']
})
export class BusinessProfileMyComponent implements OnInit, AfterViewInit {

  companyId: any;
  company: any;

  progressValue: number = 0;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private cookieService: AuthService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private alertService: AlertsService) { }
  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.getCompany(this.companyId)
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.calculateProgress(data?.company)
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
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
      }
    )
  }

  calculateProgress(data: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.progressValue = 0; // Or any other default value
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.progressValue = 0; // Or any other default value
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    this.progressValue = Math.round((completed / total) * 100);
  }

  goSeeJobs() {
    if (this.router.url === '/dashboard/business-profile-my') {
      this.router.navigate(['/dashboard/company-jobs']);
    } else if (this.router.url === '/pro/business-profile-my') {
      this.router.navigate(['/pro/company-jobs']);
    }
  }

  goProfileSettings() {
    if (this.router.url === '/dashboard/business-profile-my') {
      this.router.navigate(['/dashboard/business-profile-settings']);
    } else if (this.router.url === '/pro/business-profile-my') {
      this.router.navigate(['/pro/business-profile-settings']);
    }
  }

}
