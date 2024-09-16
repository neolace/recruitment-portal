import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { jobAdDataStrore } from '../../shared/data-store/JobAd-data-strore';
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, AfterViewInit {
  @ViewChild('jobSearchInput') jobSearchInput!: ElementRef;

  jobAdDataStore: any[] = [];
  filteredJobAds: any[] = [];
  paginatedJobAds: any[] = []; // List of jobs to show on the current page
  currentPage: number = 1;
  itemsPerPage: number = 6;  // how many items per page
  totalPages: number = 0;
  pageLimit: number = 5;     // Maximum number of pagination buttons to show
  startPage: number = 1;
  endPage: number = 5;
  pages: number[] = [];

  targetInput1: any;
  targetInput2: any;

  isSearchResultNotFound: boolean = false;
  isClearButtonVisible: boolean = false;

  jobSearch: string = '';
  locationSearch: string = '';

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private cookieService: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    // Get query parameters from route
    this.route.queryParams.subscribe(params => {
      this.jobSearch = params['jobSearch'] || '';
      this.locationSearch = params['locationSearch'] || '';

      // Initialize the data and perform filtering based on query params
      this.jobAdDataStore = jobAdDataStrore;
      this.filterJobs(); // Apply filtering based on query params
      this.totalPages = Math.ceil(this.filteredJobAds.length / this.itemsPerPage);
      this.updatePaginationRange();
      this.updatePaginatedJobAds();
    });

    this.getEmployee(this.employeeId);
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

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  filterJobs(): void {
    // Filter jobs based on both inputs (title and location)
    this.filteredJobAds = this.jobAdDataStore.filter((data: any) => {
      const titleMatch = this.targetInput1 ? data.title.toLowerCase().includes(this.targetInput1.toLowerCase()) : true;
      const locationMatch = this.targetInput2 ? data.location.toLowerCase().includes(this.targetInput2.toLowerCase()) : true;
      const titleMatchQuery = this.jobSearch ? data.title.toLowerCase().includes(this.jobSearch.toLowerCase()) : true;
      const locationMatchQuery = this.locationSearch ? data.location.toLowerCase().includes(this.locationSearch.toLowerCase()) : true;
      return titleMatch && locationMatch && titleMatchQuery && locationMatchQuery;
    });

    this.isSearchResultNotFound = this.filteredJobAds.length === 0;

    this.isClearButtonVisible = !!(this.targetInput1 || this.targetInput2 || this.jobSearch || this.locationSearch);

    // Update pagination after filtering
    this.totalPages = Math.ceil(this.filteredJobAds.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePaginationRange();
    this.updatePaginatedJobAds();
  }

  handleJobSearch(data: any): void {
    this.targetInput1 = data.value;
    this.filterJobs();
  }

  handleLocationSearch(data: any): void {
    this.targetInput2 = data.value;
    this.filterJobs();
  }

  clearSearch() {
    this.jobSearch = '';
    this.locationSearch = '';
    this.targetInput1 = '';
    this.targetInput2 = '';
    this.filteredJobAds = this.jobAdDataStore;
    this.isClearButtonVisible = false;
    this.updatePaginatedJobAds();
  }

  updatePaginatedJobAds() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobAds = this.filteredJobAds.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginationRange();
      this.updatePaginatedJobAds();
    }
  }

  updatePaginationRange() {
    if (this.currentPage <= this.pageLimit) {
      this.startPage = 1;
      this.endPage = Math.min(this.pageLimit, this.totalPages);
    } else if (this.currentPage + this.pageLimit - 1 <= this.totalPages) {
      this.startPage = this.currentPage;
      this.endPage = Math.min(this.currentPage + this.pageLimit - 1, this.totalPages);
    } else {
      this.startPage = this.totalPages - this.pageLimit + 1;
      this.endPage = this.totalPages;
    }
    this.pages = Array.from({ length: this.endPage - this.startPage + 1 }, (_, i) => i + this.startPage);
  }

  focusInput() {
    this.jobSearchInput.nativeElement.focus();
    document.body.scrollTop = 0;
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
