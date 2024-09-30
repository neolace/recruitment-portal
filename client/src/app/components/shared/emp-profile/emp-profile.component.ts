import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit, AfterViewInit{

  progressValue = 8;
  progressMode: ProgressSpinnerMode = 'determinate';

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  employees: any;
  filteredEmployees: any;

  queryId: any;

  constructor(private employeeService: EmployeeService, private cookieService: AuthService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<any> {
    this.employeeId = this.cookieService.userID();
    this.route.queryParamMap.subscribe(params => {
      this.queryId = params.get('id');
    })
    if (this.queryId) {
      this.employeeId = this.queryId
    }
    this.getEmployee(this.employeeId)
    this.getAllEmployees()
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

  getAllEmployees() {
    this.employeeService.fetchEmployees().subscribe((data: any) => {
      this.employees = data;
    })
  }

  filteredEmployeesList() {
    this.filteredEmployees = this.employees?.filter((employee: any) => employee?.occupation === this.employee?.employee?.occupation);
    return this.filteredEmployees;
  }

  calculateProfileProgress(data: any) {
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

  viewProfile(id: any) {
    if (id) {
      this.router.navigate(['/candidate-profile'], {queryParams: {id: id}});
      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }
}
