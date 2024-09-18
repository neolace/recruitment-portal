import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-free-main-db',
  templateUrl: './free-main-db.component.html',
  styleUrls: ['./free-main-db.component.scss']
})
export class FreeMainDbComponent implements AfterViewInit, OnInit {
  progressValue = 50;
  progressMode: ProgressSpinnerMode = 'determinate';

  personalProgressValue = 8;
  personalProgressMode: ProgressSpinnerMode = 'determinate';

  employee: any;
  employeeId: any;
  loading: boolean = false;
  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  cname: any = '';
  cemail: any = '';
  cphone: any = '';
  chq: any = '';
  formLocked: boolean = true;

  constructor(private employeeService: EmployeeService, private cookieService: AuthService ) {}

  async ngOnInit(): Promise<any> {
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
        this.calculateProfileProgress(this.employee?.employee);
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
    );
  }

  calculateProfileProgress(data: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.personalProgressValue = 0; // Or any other default value
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.personalProgressValue = 0; // Or any other default value
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    this.personalProgressValue = Math.round((completed / total) * 100);
  }
}
