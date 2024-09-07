import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {companyDataStore} from "../../shared/data-store/company-data-store";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit{

  companyDataStore: any[] = [];
  paginatedCompanies: any[] = []; // List of companies to show on the current page
  currentPage: number = 1;
  itemsPerPage: number = 8;  // how many items per page
  totalPages: number = 0;
  pageLimit: number = 5;     // Maximum number of pagination buttons to show
  startPage: number = 1;
  endPage: number = 5;
  pages: number[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    // Initialize the pagination
    this.companyDataStore = companyDataStore;
    this.totalPages = Math.ceil(this.companyDataStore.length / this.itemsPerPage);
    this.updatePaginationRange();
    this.updatePaginatedJobAds();
  }

  updatePaginatedJobAds() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCompanies = this.companyDataStore.slice(startIndex, endIndex);
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

  moveToRegister() {
    this.router.navigate(['/register'], {queryParams: {from: 'companies'}});
  }
}
