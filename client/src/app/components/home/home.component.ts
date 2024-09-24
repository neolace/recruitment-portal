import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {jobAdDataStrore} from "../../shared/data-store/JobAd-data-strore";
import {companyDataStore} from "../../shared/data-store/company-data-store";
import {ValueIncrementService} from "../../services/value-increment.service";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('achievementsSection') achievementsSection!: ElementRef;

  jobAdDataStrore: any = jobAdDataStrore;

  companyDataStore: any = companyDataStore;

  jobSearch: string = '';
  locationSearch: string = '';

  webDeveloperJobs: number = 0;
  graphicDesignerJobs: number = 0;
  dataEntryOperatorJobs: number = 0;
  businessDevelopmentJobs: number = 0;

  jobsAch: number = 1548;
  branchesAch: number = 25;
  countriesAch: number = 6;
  jobsAchValue: number = 0;
  branchesAchValue: number = 0;
  countriesAchValue: number = 0;
  observer!: IntersectionObserver;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  constructor(private router: Router,
              private valueIncrementService: ValueIncrementService,
              private employeeService: EmployeeService,
              private cookieService: AuthService,
              private toastr: ToastrService ) { }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver()
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

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in view, start the animation
          this.incrementJobsValue(this.jobsAch, 0);
          this.incrementBranchesValue(this.branchesAch, 50);
          this.incrementCountriesValue(this.countriesAch, 100);
          // Once the animation has started, we can stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    // Start observing the achievements section
    if (this.achievementsSection) {
      this.observer.observe(this.achievementsSection.nativeElement);
    }
  }

  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }

  makeSearchQuery() {
    if (this.jobSearch === '' && this.locationSearch === '') {
      this.router.navigate(['/job']);
      return;
    } else if (this.jobSearch === '') {
      this.router.navigate(['/job'], {queryParams: {locationSearch: this.locationSearch}});
      return;
    } else if (this.locationSearch === '') {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch}});
      return;
    } else {
      this.router.navigate(['/job'], {queryParams: {jobSearch: this.jobSearch, locationSearch: this.locationSearch}});
      return;
    }
  }

  filterJobs():any[] {
    this.webDeveloperJobs = this.jobAdDataStrore.filter((item:any) => item.title.toLowerCase().trim() === 'web developer').length;
    this.graphicDesignerJobs = this.jobAdDataStrore.filter((item:any) => item.title.toLowerCase().trim() === 'graphic designer').length;
    this.dataEntryOperatorJobs = this.jobAdDataStrore.filter((item:any) => item.title.toLowerCase().trim() === 'data entry operator').length;
    this.businessDevelopmentJobs = this.jobAdDataStrore.filter((item:any) => item.title.toLowerCase().trim() === 'business development').length;

    return [
      {
        webDeveloperJobs: this.webDeveloperJobs,
        graphicDesignerJobs: this.graphicDesignerJobs,
        dataEntryOperatorJobs: this.dataEntryOperatorJobs,
        businessDevelopmentJobs: this.businessDevelopmentJobs
      }
    ]
  }

  incrementJobsValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.jobsAchValue = value;
    }, interval);
  }

  incrementBranchesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.branchesAchValue = value;
    }, interval);
  }

  incrementCountriesValue(targetValue: number, interval: number) {
    this.valueIncrementService.incrementValue(targetValue, value => {
      this.countriesAchValue = value;
    }, interval);
  }

  saveFav(id: string) {
    if (this.employeeId == null) {
      this.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
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
    if (this.employeeId == null) {
      this.warningMessage('Please Login First to Save Jobs', 'Reminder');
      return;
    }
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
