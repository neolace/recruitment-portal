import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "../../../../services/employee.service";
import {AuthService} from "../../../../services/auth.service";
import {CompanyService} from "../../../../services/company.service";
import {jobCategories} from "../../../../shared/data-store/job-categories-data-store";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "../../../../services/alerts.service";
import {ActivatedRoute} from "@angular/router";
import {FileUploadService} from "../../../../services/file-upload.service";
import {CanComponentDeactivate} from "../../../../guards/can-deactivate.guard";
import {UnloadService} from "../../../../services/common/unload.service";

declare var bootstrap: any;

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements AfterViewInit, OnInit, CanComponentDeactivate, OnDestroy {

  selectedCategory: any = 'Software Development and Engineering';
  selectedJobType: any = 'Backend Developer';
  categoriesDataStore: any = jobCategories;
  filteredCategories: any = [];
  filteredJobTypes: any = [];
  isOtherCategorySelected: boolean = false;
  isOtherJobTypeSelected: boolean = false;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  company: any;
  companyId: any;
  companyLevel: any;
  jobId: any;
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
  formLocked: boolean = false;

  postedJobs: any = [];

  downloadURL?: any;

  jobPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('IT', [Validators.required]),
    jobType: new FormControl('Web Developer', [Validators.required]),
    salary: new FormControl(''),
    minSalary: new FormControl(''),
    maxSalary: new FormControl(''),
    totalOpenings: new FormControl('', [Validators.required]),
    ageRange: new FormControl('18-30'),
    employeeType: new FormControl('', [Validators.required]),
    locationType: new FormControl('', [Validators.required]),
    skills: new FormControl(''),
    qualifications: new FormControl(''),
    experience: new FormControl(''),
    requirements: new FormControl(''),
    education: new FormControl(''),
    responsibilities: new FormControl(''),
    offer: new FormControl(''),
    es: new FormControl('BSc', [Validators.required]),
    exs: new FormControl('0-2 years', [Validators.required]),
    address: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    postdate: new FormControl('', [Validators.required]),
    expdate: new FormControl(''),
  })

  constructor(private employeeService: EmployeeService,
              private cookieService: AuthService,
              private alertService: AlertsService,
              private route: ActivatedRoute,
              private fileUploadService: FileUploadService,
              private unloadService: UnloadService,
              private companyService: CompanyService) {
    this.jobPostForm.valueChanges.subscribe(() => {
      this.unloadService.setUnsavedChanges(this.jobPostForm.dirty);
    });
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.companyId = this.cookieService.organization();
    this.companyLevel = this.cookieService.level();
    this.getEmployee(this.employeeId);
    this.getCompany(this.companyId);

    if (this.companyLevel <= 2) {
      this.jobPostForm.get('expdate')?.disable();
    } else {
      this.jobPostForm.get('expdate')?.enable();
    }

    this.route.queryParams.subscribe(params => {
      this.jobId = params['id'];
      if (this.jobId) {
        this.patchValues(this.jobId);
      }
    })
  }

  canDeactivate(): boolean {
    if (this.jobPostForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  ngOnDestroy() {
    this.unloadService.setUnsavedChanges(false);
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
    this.formLocked = true;
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
    return this.filteredJobTypes = this.categoriesDataStore.filter((category: any) => category.name === selectedCategory)[0]?.subCategories;
  }

  saveJobPost() {
    const postdate: any = this.jobPostForm.get('postdate')?.value;
    let expdate: any = this.jobPostForm.get('expdate')?.value;

    // If expdate is null or the control is disabled, set expdate to 10 days after postdate
    if (!expdate || this.jobPostForm.get('expdate')?.disabled) {
      const postdateObj = new Date(postdate);
      postdateObj.setDate(postdateObj.getDate() + 10);  // Add 10 days to postdate
      expdate = postdateObj.toISOString().split('T')[0];  // Format to YYYY-MM-DD
    }

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
      jobBanner: this.downloadURL ? this.downloadURL : null,
      datePosted: postdate,
      expiryDate: expdate,
      popularityScore: 0
    }]

    if (this.companyLevel === '2'){
      if (this.postedJobs[0]?.postedJobs?.length >= 3) {
        this.alertService.warningMessage('You Reached Maximum Job Post Limit. Upgrade to Add More!', 'Warning');
        return;
      }
    }

    if (this.companyLevel === '3'){
      if (this.postedJobs[0]?.postedJobs.length >= 10) {
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

  patchValues(jobId: any) {
    this.companyService.getPostedJob(this.companyId, jobId).subscribe(
      (data) => {
        console.log(data)
        this.jobPostForm.get('title')?.setValue(data.title);
        this.jobPostForm.get('description')?.setValue(data.description);
        this.jobPostForm.get('category')?.setValue(data.category);
        this.jobPostForm.get('jobType')?.setValue(data.jobType);
        this.jobPostForm.get('salary')?.setValue(data.salary);
        this.jobPostForm.get('minSalary')?.setValue(data.minSalary);
        this.jobPostForm.get('maxSalary')?.setValue(data.maxSalary);
        this.jobPostForm.get('totalOpenings')?.setValue(data.totalOpenings);
        this.jobPostForm.get('ageRange')?.setValue(data.ageRange);
        this.jobPostForm.get('employeeType')?.setValue(data.employeeType);
        this.jobPostForm.get('locationType')?.setValue(data.locationType);
        this.jobPostForm.get('skills')?.setValue(data.skills);
        this.jobPostForm.get('qualifications')?.setValue(data.qualifications);
        this.jobPostForm.get('experience')?.setValue(data.experience);
        this.jobPostForm.get('requirements')?.setValue(data.requirements);
        this.jobPostForm.get('education')?.setValue(data.education);
        this.jobPostForm.get('responsibilities')?.setValue(data.responsibilities);
        this.jobPostForm.get('offer')?.setValue(data.offers);
        this.jobPostForm.get('es')?.setValue(data.eduShortDesc);
        this.jobPostForm.get('exs')?.setValue(data.exShortDesc);
        this.jobPostForm.get('country')?.setValue(data.location.split(',')[0]);
        this.jobPostForm.get('state')?.setValue(data.location.split(',')[1]);
        this.jobPostForm.get('postdate')?.setValue(data.datePosted);
        this.jobPostForm.get('expdate')?.setValue(data.expiryDate);
      }
    )
  }

  updateJob(){
    this.loading = true;
    this.companyService.updatePostedJob(this.companyId, this.jobId, {
      id: this.jobId,
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
    }).subscribe(
      (data) => {
        this.loading = false;
        this.alertService.successMessage('Job Post Updated Successfully', 'Success');
      },
      (error) => {
        this.loading = false;
        this.alertService.errorMessage('Unable to Update Job Post', 'Error');
      }
    )
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  uploadFile(event: any, filePath: string) {
    const file = event.target.files[0];
    const maxFileSize = 1.5 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 1.5MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG and JPEG files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.loading = false;
        this.downloadURL = url;
        this.alertService.successMessage('Successfully uploaded banner.', 'Success');
      }, () => {
        this.loading = false;
        this.alertService.errorMessage('Failed to upload file. Please try again.', 'Error');
      });
    }
  }
}
