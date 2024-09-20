import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {CompanyService} from "../../../../services/company.service";
import {AlertsService} from "../../../../services/alerts.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FileUploadService} from "../../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-business-profile-settings',
  templateUrl: './business-profile-settings.component.html',
  styleUrls: ['./business-profile-settings.component.scss']
})
export class BusinessProfileSettingsComponent implements AfterViewInit, OnInit{

  companyId: any;
  company: any;

  progressValue: number = 0;

  downloadURL?: any;

  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  visualDetailsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    founded: new FormControl(''),
    founder: new FormControl(''),
    noe: new FormControl(''),
    hq: new FormControl('', [Validators.required]),
    story: new FormControl('')
  })

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('')
  })

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cookieService: AuthService,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private fileUploadService: FileUploadService,
              private alertService: AlertsService) {}

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.getCompany(this.companyId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.calculateProgress(data?.company)
        this.patchVisualDetails();
        this.patchContactDetails();
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

  calculateProgress(data: any) {
    this.loading = false;
    if (!data || !data.profileCompleted) {
      this.progressValue = 0; // Or any other default value
      return;
    }

    const profileCompletion = data.profileCompleted;
    if (typeof profileCompletion !== 'object' || profileCompletion === null) {
      // Handle case where profileCompletion is not an object or is null
      this.progressValue = 0; // Or any other default value
      return;
    }

    const completionArray = Object.values(profileCompletion);
    const total = completionArray.length;
    const completed = completionArray.filter((item: any) => item === true).length;
    this.progressValue = Math.round((completed / total) * 100);
  }

  uploadFile(event: any, filePath: string, location: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 2MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG and JPEG files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;
        switch (location) {
          case 'logo':
            if (!this.downloadURL) {
              this.loading = false;
              this.alertService.warningMessage('Path created! Not updated your profile! Please choose again!!', 'Warning');
              return;
            }
            this.companyService.updateLogoPic({
              id: this.companyId,
              logo: this.downloadURL
            }).subscribe((data) => {
              this.getCompany(this.companyId);
              this.loading = false;
              this.alertService.successMessage('Logo uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'cover':
            if (!this.downloadURL) {
              this.loading = false;
              this.alertService.errorMessage('Path created! Not updated your profile! Please choose again!!', 'Warning');
              return;
            }
            this.companyService.updateCoverPic({
              id: this.companyId,
              profileBanner: this.downloadURL
            }).subscribe((data) => {
              this.getCompany(this.companyId);
              this.loading = false;
              this.alertService.successMessage('Cover image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'thumb1':
            if (!this.downloadURL) {
              this.loading = false;
              this.alertService.errorMessage('Path created! Not updated your profile! Please choose again!!', 'Warning');
              return;
            }
            this.companyService.updateThumb1Pic({
              id: this.companyId,
              image1: this.downloadURL
            }).subscribe((data) => {
              this.getCompany(this.companyId);
              this.loading = false;
              this.alertService.successMessage('Profile image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'thumb2':
            if (!this.downloadURL) {
              this.loading = false;
              this.alertService.errorMessage('Path created! Not updated your profile! Please choose again!!', 'Warning');
              return;
            }
            this.companyService.updateThumb2Pic({
              id: this.companyId,
              image2: this.downloadURL
            }).subscribe((data) => {
              this.getCompany(this.companyId);
              this.loading = false;
              this.alertService.successMessage('Profile image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'thumb3':
            if (!this.downloadURL) {
              this.loading = false;
              this.alertService.errorMessage('Path created! Not updated your profile! Please choose again!!', 'Warning');
              return;
            }
            this.companyService.updateThumb3Pic({
              id: this.companyId,
              image3: this.downloadURL
            }).subscribe((data) => {
              this.getCompany(this.companyId);
              this.loading = false;
              this.alertService.successMessage('Profile image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          default:
            break;
        }
      }, error => {
        this.loading = false;
        this.alertService.warningMessage('Path created! Not updated your profile! Reload & choose again!!', 'Warning');
      });
    }
  }

  updateVisualDetails() {
    if (this.visualDetailsForm.invalid) {
      this.alertService.warningMessage('Name & Head Quaters are required.', 'Warning');
      return;
    }
    this.companyService.updateCompany({
      id: this.companyId,
      ...this.company.company,
      name: this.visualDetailsForm.get('name')?.value,
      foundedDate: this.visualDetailsForm.get('founded')?.value,
      founderName: this.visualDetailsForm.get('founder')?.value,
      numberOfEmployees: this.visualDetailsForm.get('noe')?.value,
      location: this.visualDetailsForm.get('hq')?.value,
      companyStory: this.visualDetailsForm.get('story')?.value,
    }).subscribe((data) => {
      this.getCompany(this.companyId);
      this.clear('visual')
      this.loading = false;
      this.alertService.successMessage('Company details updated successfully.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
    })
  }

  updateContactDetails() {
    if (this.contactForm.invalid) {
      this.alertService.warningMessage('Email & Phone are required.', 'Warning');
      return;
    }
    this.companyService.updateCompany({
      id: this.companyId,
      ...this.company.company,
      contactEmail: this.contactForm.get('email')?.value,
      contactNumber: this.contactForm.get('phone')?.value,
      website: this.contactForm.get('website')?.value
    }).subscribe((data) => {
      this.getCompany(this.companyId);
      this.clear('contact')
      this.loading = false;
      this.alertService.successMessage('Company details updated successfully.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
    })
  }

  patchVisualDetails() {
    this.visualDetailsForm.get('name')?.setValue(this.company?.company?.name);
    this.visualDetailsForm.get('founded')?.setValue(this.company?.company?.foundedDate);
    this.visualDetailsForm.get('founder')?.setValue(this.company?.company?.founderName);
    this.visualDetailsForm.get('noe')?.setValue(this.company?.company?.numberOfEmployees);
    this.visualDetailsForm.get('hq')?.setValue(this.company?.company?.location);
    this.visualDetailsForm.get('story')?.setValue(this.company?.company?.companyStory);
  }

  patchContactDetails() {
    this.contactForm.get('email')?.setValue(this.company?.company?.contactEmail);
    this.contactForm.get('phone')?.setValue(this.company?.company?.contactNumber);
    this.contactForm.get('website')?.setValue(this.company?.company?.website);
  }

  clear(form: string) {
    switch (form) {
      case 'visual':
        this.visualDetailsForm.reset();
        break;
      case 'contact':
        this.contactForm.reset();
        break;
      default:
        break;
    }
  }
}
