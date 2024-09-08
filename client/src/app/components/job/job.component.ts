import { Component, OnInit } from '@angular/core';
import { jobAdDataStrore } from '../../shared/data-store/JobAd-data-strore';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  heart: boolean = false; //test
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

  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
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
}
