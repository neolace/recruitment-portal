import {AfterViewInit, Component, OnInit} from '@angular/core';
import {jobAdDataStrore} from "../../../shared/data-store/JobAd-data-strore";
import {Router} from "@angular/router";
import {ValueIncrementService} from "../../../services/value-increment.service";
import {EmployeeService} from "../../../services/employee.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, AfterViewInit{

  jobDataStore: any = jobAdDataStrore;
  filteredJobDataStore: any[] = [];
  jobPostId: any;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  constructor(private router: Router,
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private cookieService: AuthService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.jobPostId = this.router.url.split('/')[2];
    this.employeeId = this.cookieService.userID();
    this.filterJobData();
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.userSavedIds = this.employee.employee.savedJobs.map((job: any) => job.jobId);
      },
      (error: any) => {
        this.warningMessage('Please Login First to Apply Jobs', 'Reminder');
      }
    );
  }

  filterJobData(): any[] {
    this.filteredJobDataStore = this.jobDataStore.filter((job: any) => job.id === this.jobPostId);
    return this.filteredJobDataStore;
  }

  saveFav(id: string) {
    this.employeeService.saveFavJobs(this.employeeId, {
      jobId: id,
      status: 'saved'
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Saved Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  removeFav(id: string) {
    this.employeeService.removeFavJobs(this.employeeId, id).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Job Removed Successfully', 'Success');
    }, (error: any) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  successMessage(msg: string, title: string) {
    this.toastr.success(msg, title, {
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(msg: string, title: string) {
    this.toastr.error(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  warningMessage(msg: string, title: string) {
    this.toastr.warning(msg, title, {
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
