import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ThemeService} from "./services/theme.service";
import {NavigationEnd, Router} from "@angular/router";
import {LockScreenComponent} from "./components/lock-screen/lock-screen.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {FreeDashboardComponent} from "./components/dashboards/free/free-dashboard/free-dashboard.component";
import {ProDashboardComponent} from "./components/dashboards/pro/pro-dashboard/pro-dashboard.component";
import {commonSearchResults} from "./shared/data-store/common-search-results";
import {AuthService} from "./services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EmployeeService} from "./services/employee.service";
import {CredentialService} from "./services/credential.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertsService} from "./services/alerts.service";
import {FileUploadService} from "./services/file-upload.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('navbarNav') navbarNav: ElementRef | any;
  title = 'SPARKC HR System';

  showNavbar = true;
  showFooter = true;

  openSearchResults = false;
  commonSearchResults: any[] = commonSearchResults;
  filteredSearchResults: any[] = [];
  targetInput: any;

  employee: any;
  employeeId: any;
  employeeLevel: any;
  employeeType: any;

  downloadURL?: any;

  reportIssueForm = new FormGroup({
    issueType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  constructor(public themeService: ThemeService,
              private router: Router,
              private renderer: Renderer2,
              private employeeService: EmployeeService,
              private credentialsService: CredentialService,
              private fileUploadService: FileUploadService,
              private alertService: AlertsService,
              private cookieService: AuthService) {}

  ngOnInit() {
    this.employeeId = this.cookieService.userID();
    this.employeeLevel = this.cookieService.level();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Logic to update active class based on the current route
        this.updateActiveClass();

        const mainBody = document.querySelector('.main-body');
        if (mainBody) {
          mainBody.scrollTop = 0;
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnDestroy() {
    this.removeUnwantedSession()
  }

  getEmployee(id: any) {
    this.employeeService.getEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.credentialsService.fetchCredentialByEmployeeId(this.employeeId).subscribe(
          (data) => {
            this.employeeType = data?.role
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log(error)
      }
    );
  }

  updateActiveClass() {
    const currentRoute = this.router.url;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    const activeLink = document.querySelector(`.nav-link[href="${currentRoute}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isActive(s: string) {
    return this.router.url === s;
  }

  collapseNavbar() {
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      this.renderer.removeClass(navbar, 'show');
    }
  }

  toggleCommonComponent(component: any) {
    if (component instanceof LockScreenComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else if(component instanceof LoginComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else if(component instanceof RegisterComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else if(component instanceof ResetPasswordComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else if(component instanceof FreeDashboardComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else if(component instanceof ProDashboardComponent){
      this.showNavbar = false;
      this.showFooter = false;
    } else {
      this.showNavbar = true;
      this.showFooter = true;
    }
  }

  filterSearchResults(): any[]{
    if (this.targetInput === undefined){
      this.filteredSearchResults = this.commonSearchResults
    }
    return this.filteredSearchResults;
  }

  handleSearch(data: any) {
    this.openSearchResults = !this.openSearchResults;
    this.targetInput = data as HTMLInputElement;
    const value = this.targetInput.value
    if (value) {
      this.filteredSearchResults = this.commonSearchResults.filter((data: any) =>
        data.name.toLowerCase().includes(value.toLowerCase())
      );
    } else {
      this.filteredSearchResults = this.commonSearchResults;
    }
  }

  removeUnwantedSession() {
    sessionStorage.clear();
  }

  logout() {
    this.cookieService.logout()
    this.removeUnwantedSession()
    this.router.navigate(['/login']);
  }

  uploadFile(event: any, filePath: string, location: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 2MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG, JPEG, and PDF files are allowed.', 'Warning');
        return;
      }
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;
        //TODO: Upload to AWS S3
      });
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  reportIssue() {
    if (this.reportIssueForm.valid) {
      console.log(this.reportIssueForm.value)
    }
  }
}
