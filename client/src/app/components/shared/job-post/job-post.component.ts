import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../../../services/employee.service";
import {AuthService} from "../../../services/auth.service";
import {CompanyService} from "../../../services/company.service";
import {jobCategories} from "../../../shared/data-store/job-categories-data-store";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  formLocked: boolean = true;

  jobPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    minSalary: new FormControl('', [Validators.required]),
    maxSalary: new FormControl('', [Validators.required]),
    totalOpenings: new FormControl('', [Validators.required]),
    employeeType: new FormControl('', [Validators.required]),
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

  constructor(private employeeService: EmployeeService, private cookieService: AuthService, private companyService: CompanyService) {
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
  }

  onJobTypeChange(): void {
    this.isOtherJobTypeSelected = this.selectedJobType === 'Other';
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
          if (this.cname && this.cemail && this.cphone && this.chq) {
            this.formLocked = false;
          }
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
}
