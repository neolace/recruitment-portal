import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {CompanyService} from "../../../../services/company.service";
import {AlertsService} from "../../../../services/alerts.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-company-jobs-my',
  templateUrl: './company-jobs-my.component.html',
  styleUrls: ['./company-jobs-my.component.scss']
})
export class CompanyJobsMyComponent implements AfterViewInit, OnInit{

  companyId: any;
  company: any;
  postedJobs: any;

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

  ngOnInit() {
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
        this.postedJobs = data?.postedJobs[0];
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

  isExpired(expiryDate: any) {
    return new Date(expiryDate) > new Date();
  }
}
