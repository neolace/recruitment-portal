import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {CompanyService} from "../../services/company.service";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit, AfterViewInit{

  companyDataStore: any;
  filteredCompanyDataStore: any[] = [];
  socialsDataStore: any[] = [];
  filteredSocialsDataStore: any[] = [];
  postedJobsDataStore: any[] = [];
  filteredPostedJobsDataStore: any[] = [];
  companyId: any;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  constructor(private router: Router, private companyService: CompanyService ) { }

  ngOnInit(): void {
    this.companyId = this.router.url.split('/')[2];
    this.getCompany(this.companyId)
    this.filterCompanyData();
    this.filterSocialsData();
    this.filterPostedJobsData();
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.companyDataStore = [data.company];
        this.postedJobsDataStore = [data.postedJobs];
        this.socialsDataStore = [data.socials];
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

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  filterCompanyData(): any[] {
    this.filteredCompanyDataStore = this.companyDataStore?.filter((data: any) => data.id === this.companyId);
    return this.filteredCompanyDataStore;
  }

  filterSocialsData(): any[] {
    this.filteredSocialsDataStore = this.socialsDataStore[0]?.filter((data: any) => data.companyId === this.companyId);
    return this.filteredSocialsDataStore;
  }

  filterPostedJobsData(): any[] {
    this.filteredPostedJobsDataStore = this.postedJobsDataStore[0]?.filter((data: any) => data.companyId === this.companyId);
    return this.filteredPostedJobsDataStore;
  }

}
