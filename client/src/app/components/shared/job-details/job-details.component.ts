import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ValueIncrementService} from "../../../services/value-increment.service";
import {EmployeeService} from "../../../services/employee.service";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {CompanyService} from "../../../services/company.service";


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, AfterViewInit{

  jobDataStore: any[] = [];
  filteredJobs: any[] = [];
  filteredJobDataStore: any[] = [];
  jobPostId: any;
  jobPostTitle: any;
  companyName: any;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  companyId: any;
  userSavedIds: any[] = [];

  constructor(private router: Router,
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.jobPostId = this.router.url.split('/')[2];
    this.employeeId = this.cookieService.userID();
    this.filterJobData();
    this.getEmployee(this.employeeId);
    this.getAllJobs();
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

  getAllJobs() {
    this.companyService.fetchAllPostedJobs().subscribe((data) => {
      data.forEach((company: any) => {
        company.postedJobs.forEach((job: any) => {
          // Add company details to each job
          job.companyName = company.companyName;
          job.companyLogo = company.companyLogo;
          job.companyLevel = company.companyLevel;
          job.companyId = company.companyId;
          this.jobDataStore.push(job);
        });
      });
    });
  }

  filterJobsAds(): any[] {
    this.filteredJobs = this.jobDataStore.filter((job: any) => job.title !== null && job.title === this.jobPostTitle && job.id !== this.jobPostId && new Date(job.expiryDate) > new Date());
    if (this.filteredJobs.length === 0) {
      this.filteredJobs = this.jobDataStore.filter((job: any) => job.companyName === this.companyName && job.id !== this.jobPostId && new Date(job.expiryDate) > new Date());
    }
    this.sortJobsByType();
    return this.filteredJobs;
  }

  sortJobsByType(): void {
    this.filteredJobs?.sort((a, b) => {
      const order: any = {'4': 1, '3': 2, '2': 3};

      // Sort by the defined order (premium first, then pro, then free)
      return order[a.companyLevel] - order[b.companyLevel];
    });
  }

  filterJobData(): any[] {
    this.filteredJobDataStore = this.jobDataStore.filter((job: any) => job.id === this.jobPostId);
    this.jobPostTitle = this.filteredJobDataStore[0]?.title;
    this.companyName = this.filteredJobDataStore[0]?.companyName;
    this.companyId = this.filteredJobDataStore[0]?.companyId;
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

  navigateToJobDetails(id:any) {
    this.router.navigate(['/job-details', id]);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  navigateToApplyJob() {
    this.router.navigate(['/job-apply'], {queryParams: {companyId: this.companyId, jobId: this.jobPostId}});
  }
}
