import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common/common.service";
import {AlertsService} from "../../../services/alerts.service";

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

  contactUsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  mailLoading: boolean = false;

  constructor(private employeeService: EmployeeService,
              public cookieService: AuthService,
              private commonService: CommonService,
              private alertService: AlertsService,
              private router: Router,
              private route: ActivatedRoute) {}

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

  contact() {
    if (this.contactUsForm.valid) {
      if (this.employee?.employee?.email) {
        this.mailLoading = true;
        this.commonService.personalContact({
          name: this.contactUsForm.get('name')?.value,
          fromEmail: this.contactUsForm.get('email')?.value,
          toEmail: this.employee?.employee?.email,
          subject: this.contactUsForm.get('subject')?.value,
          message: this.contactUsForm.get('message')?.value
        }).subscribe((res: any) => {
          this.mailLoading = false;
          this.contactUsForm.reset();
          this.alertService.successMessage('Your message has been sent.', 'Contact Candidate');
        }, (err: any) => {
          this.mailLoading = false;
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Contact Candidate');
        })
      } else {
        this.alertService.warningMessage('Sorry! this candidate is not provided a public email address.', 'Contact Candidate');
      }
    } else {
      this.alertService.errorMessage('Please fill in all the required fields.', 'Contact Candidate');
    }
  }
}
