import {AfterViewInit, Component} from '@angular/core';
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {EmployeeService} from "../../../../services/employee.service";
import {CompanyService} from "../../../../services/company.service";
import {JobApplyService} from "../../../../services/job-apply.service";
import {AuthService} from "../../../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-pro-main-db',
  templateUrl: './pro-main-db.component.html',
  styleUrls: ['./pro-main-db.component.scss']
})
export class ProMainDbComponent implements AfterViewInit{

  progressValue = 50;
  progressMode: ProgressSpinnerMode = 'determinate';

  personalProgressValue = 8;
  personalProgressMode: ProgressSpinnerMode = 'determinate';

  applicants: any[] = [];
  filteredApplicants: any[] = [];
  views: any[] = [];
  filteredViews: any[] = [];
  applicantsMap: any = {}; // Store applicants by jobPostId
  viewsMap: any = {}; // Store viewers by jobPostId

  employee: any;
  employeeId: any;
  company: any;
  jobPosts: any = [];
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

  profileCompletionForm = new FormGroup({
    cname: new FormControl('', [Validators.required]),
    cemail: new FormControl('', [Validators.required, Validators.email]),
    cphone: new FormControl('', [Validators.required]),
    chq: new FormControl('', [Validators.required]),
    uname: new FormControl('', [Validators.required]),
    udesignation: new FormControl('', [Validators.required]),
  })

  constructor(private employeeService: EmployeeService,
              private companyService: CompanyService,
              private jobApplyService: JobApplyService,
              private cookieService: AuthService ) {}

  async ngOnInit(): Promise<any> {
    this.employeeId = this.cookieService.userID();
    this.companyId = this.cookieService.organization();
    this.getEmployee(this.employeeId)
    this.getCompany(this.companyId);
    this.fetchJobPostData();
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
        this.calculateProfileProgress(this.employee?.employee, 'employer');
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
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.jobPosts = data?.postedJobs[0]?.postedJobs;
        this.calculateProfileProgress(data?.company, 'company');
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
          location.reload();
          return;
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

  calculateProfileProgress(data: any, who: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.progressValue = 0;
      this.personalProgressValue = 0;
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.progressValue = 0;
      this.personalProgressValue = 0;
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    if (who === 'employer') {
      this.personalProgressValue = Math.round((completed / total) * 100);
    } else if (who === 'company') {
      this.progressValue = Math.round((completed / total) * 100);
    }
  }

  fetchJobPostData() {
    this.jobApplyService.fetchJobApply().subscribe(
      (data: any) => {
        data?.forEach((jobPost: any) => {
          this.applicantsMap[jobPost.jobId] = jobPost.applicants?.length || 0;
          this.viewsMap[jobPost.jobId] = jobPost.viewers?.length || 0;
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  getApplicants(jobPostId: string): number {
    return this.applicantsMap[jobPostId] || 0;
  }

  getViews(jobPostId: string): number {
    return this.viewsMap[jobPostId] || 0;
  }

  open_form(){
    setTimeout(() => {
      const model = document.getElementById('quick_details_model_open');
      model?.click();
    }, 100);
  }

  completeActivation() {
    if (this.profileCompletionForm.valid){

    } else {
      this.profileCompletionForm.markAllAsTouched();
    }
  }
}
