import { Component, OnInit } from '@angular/core';
import { jobAdDataStrore } from '../../shared/data-store/JobAd-data-strore';

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

  constructor() { }

  ngOnInit() {
    // Initialize the data and pagination
    this.jobAdDataStore = jobAdDataStrore;
    this.filteredJobAds = this.jobAdDataStore; // Initially, all jobs are shown
    this.totalPages = Math.ceil(this.filteredJobAds.length / this.itemsPerPage);
    this.updatePaginationRange();
    this.updatePaginatedJobAds();
  }

  filterJobs(): void {
    // Filter jobs based on both inputs (title and location)
    this.filteredJobAds = this.jobAdDataStore.filter((data: any) => {
      const titleMatch = this.targetInput1 ? data.title.toLowerCase().includes(this.targetInput1.toLowerCase()) : true;
      const locationMatch = this.targetInput2 ? data.location.toLowerCase().includes(this.targetInput2.toLowerCase()) : true;
      return titleMatch && locationMatch;
    });

    this.isSearchResultNotFound = this.filteredJobAds.length === 0;

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
