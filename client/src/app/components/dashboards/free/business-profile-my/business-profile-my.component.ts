import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {CompanyService} from "../../../../services/company.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../../../../services/employee.service";
import {AlertsService} from "../../../../services/alerts.service";

@Component({
  selector: 'app-business-profile-my',
  templateUrl: './business-profile-my.component.html',
  styleUrls: ['./business-profile-my.component.scss']
})
export class BusinessProfileMyComponent implements OnInit, AfterViewInit {

  employeeId: any;
  employee: any;
  companyId: any;
  company: any;

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
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId)
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.getCompany(this.employee?.employee?.companyId);
      },
      (error) => {
        this.alertService.errorMessage('An unexpected error has occurred', 'Unexpected Error');
        this.loading = false;
      }
    );
  }

  getCompany(id: any) {
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        console.log(this.company)
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
