import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../../../services/employee.service";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";
import {jobCategories} from "../../../shared/data-store/job-categories-data-store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../services/alerts.service";

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements AfterViewInit, OnInit {

  selectedCategory: any = 'IT';
  selectedJobType: any = 'Web Developer';
  categoriesDataStore: any = jobCategories;
  filteredCategories: any = [];
  filteredJobTypes: any = [];
  isOtherCategorySelected: boolean = false;
  isOtherJobTypeSelected: boolean = false;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  company: any;
  companyId: any;
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
  cLogo: any = '';
  formLocked: boolean = true;

  postedJobs: any = [];

  jobPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('IT', [Validators.required]),
    jobType: new FormControl('Web Developer', [Validators.required]),
    salary: new FormControl(''),
    minSalary: new FormControl(''),
    maxSalary: new FormControl(''),
    totalOpenings: new FormControl('', [Validators.required]),
    ageRange: new FormControl(''),
    employeeType: new FormControl('', [Validators.required]),
    locationType: new FormControl('', [Validators.required]),
    skills: new FormControl(''),
    qualifications: new FormControl(''),
    experience: new FormControl(''),
    requirements: new FormControl(''),
    education: new FormControl(''),
    responsibilities: new FormControl(''),
    offer: new FormControl(''),
    es: new FormControl('', [Validators.required]),
    exs: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postdate: new FormControl('', [Validators.required]),
    expdate: new FormControl(''),
  })

  constructor(private employeeService: EmployeeService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private companyService: CompanyService) {
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.companyId = this.cookieService.organization();
    this.getEmployee(this.employeeId)
    this.getCompany(this.companyId)
  }

  onCategoryChange(): void {
    this.isOtherCategorySelected = this.selectedCategory === 'Other';
    this.isOtherJobTypeSelected = this.selectedCategory === 'Other';
    if (this.selectedCategory) {
      this.jobPostForm.get('category')?.setValue(this.selectedCategory);
    }
  }

  onJobTypeChange(): void {
    this.isOtherJobTypeSelected = this.selectedJobType === 'Other';
    if (this.selectedJobType) {
      this.jobPostForm.get('jobType')?.setValue(this.selectedJobType);
    }
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
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
    );
  }

  getCompany(id: any) {
    this.loading = true;
    if (id) {
      this.companyService.fetchFullCompany(id).subscribe(
        (data) => {
          this.company = data;
          this.cname = this.company?.company?.name;
          this.cemail = this.company?.company?.contactEmail;
          this.cphone = this.company?.company?.contactNumber;
          this.chq = this.company?.company?.location;
          this.cLogo = this.company?.company?.logo;
          if (this.cname && this.cemail && this.cphone && this.chq) {
            this.formLocked = false;
          }
          this.postedJobs = this.company?.postedJobs;
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
  }

  filterCategories() {
    return this.filteredCategories = this.categoriesDataStore;
  }

  filterJobTypes(selectedCategory: any) {
    return this.filteredJobTypes = this.categoriesDataStore.filter((category: any) => category.name === selectedCategory)[0].subCategories;
  }

  saveJobPost() {
    const postData = [{
      id: this.generateRandomId(),
      title: this.jobPostForm.get('title')?.value,
      description: this.jobPostForm.get('description')?.value,
      category: this.selectedCategory ? this.selectedCategory : this.jobPostForm.get('category')?.value,
      jobType: this.selectedJobType ? this.selectedJobType : this.jobPostForm.get('jobType')?.value,
      salary: this.jobPostForm.get('salary')?.value,
      minSalary: this.jobPostForm.get('minSalary')?.value,
      maxSalary: this.jobPostForm.get('maxSalary')?.value,
      totalOpenings: this.jobPostForm.get('totalOpenings')?.value,
      ageRange: this.jobPostForm.get('ageRange')?.value,
      employeeType: this.jobPostForm.get('employeeType')?.value,
      locationType: this.jobPostForm.get('locationType')?.value,
      skills: this.jobPostForm.get('skills')?.value,
      qualifications: this.jobPostForm.get('qualifications')?.value,
      experience: this.jobPostForm.get('experience')?.value,
      requirements: this.jobPostForm.get('requirements')?.value,
      education: this.jobPostForm.get('education')?.value,
      responsibilities: this.jobPostForm.get('responsibilities')?.value,
      offers: this.jobPostForm.get('offer')?.value,
      eduShortDesc: this.jobPostForm.get('es')?.value,
      exShortDesc: this.jobPostForm.get('exs')?.value,
      location: this.jobPostForm.get('country')?.value + ', ' + this.jobPostForm.get('state')?.value,
      datePosted: this.jobPostForm.get('postdate')?.value,
      expiryDate: this.jobPostForm.get('expdate')?.value,
      popularityScore: 0
    }]

    if (this.cookieService.level() === '2'){
      if (this.postedJobs[0].postedJobs.length >= 3) {
        this.alertService.warningMessage('You Reached Maximum Job Post Limit. Upgrade to Add More!', 'Warning');
        return;
      }
    }

    if (this.formLocked) {
      this.alertService.warningMessage('Form Locked! Complete main details on profile', 'Warning');
      return;
    }

    if (this.jobPostForm.invalid) {
      this.alertService.warningMessage('Please fill all required fields! (Starred with *)', 'Warning');
      return;
    }

    this.loading = true;
    this.companyService.addJobPost({
      companyId: this.companyId,
      companyName: this.cname,
      companyLogo: this.cLogo,
      companyLevel: this.cookieService.level(),
      postedJobs: postData
    }).subscribe(
      (data) => {
        this.loading = false;
        this.jobPostForm.reset();
        this.alertService.successMessage('Job Post Added Successfully', 'Success');
      },
      (error) => {
        this.loading = false;
        this.alertService.errorMessage('Unable to Add Job Post', 'Error');
      }
    )
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
