import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {companyDataStore} from "../../shared/data-store/company-data-store";

@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.scss']
})
export class BusinessProfileComponent implements OnInit, AfterViewInit{

  companyDataStore: any = companyDataStore;
  filteredCompanyDataStore: any[] = [];
  companyId: any;

  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.companyId = this.router.url.split('/')[2];
    this.filterCompanyData();
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  filterCompanyData(): any[] {
    this.filteredCompanyDataStore = this.companyDataStore.filter((data: any) => data.id === this.companyId);
    return this.filteredCompanyDataStore;
  }

}
