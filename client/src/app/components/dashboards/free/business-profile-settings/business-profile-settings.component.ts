import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {EmployeeService} from "../../../../services/employee.service";
import {CompanyService} from "../../../../services/company.service";
import {AlertsService} from "../../../../services/alerts.service";
import {HttpErrorResponse} from "@angular/common/http";
import {FileUploadService} from "../../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialService} from "../../../../services/credential.service";

@Component({
  selector: 'app-business-profile-settings',
  templateUrl: './business-profile-settings.component.html',
  styleUrls: ['./business-profile-settings.component.scss']
})
export class BusinessProfileSettingsComponent implements AfterViewInit, OnInit, OnDestroy{

  employeeId: any;
  companyId: any;
  company: any;
  editSocialLinksId: any;

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

  socialForm = new FormGroup({
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    github: new FormControl(''),
  })

  changePassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required])
  })

  aNotificationsForm = new FormGroup({
    mention: new FormControl(false),
    follow: new FormControl(false),
    share: new FormControl(false),
    message: new FormControl(false)
  })

  mNotificationsForm = new FormGroup({
    promotion: new FormControl(false),
    companyNews: new FormControl(false),
    jobs: new FormControl(false),
    unsubscribe: new FormControl(false)
  })

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cookieService: AuthService,
              private employeeService: EmployeeService,
              private credentialService: CredentialService,
              private companyService: CompanyService,
              private fileUploadService: FileUploadService,
              private alertService: AlertsService) {}

  ngOnInit(): void {
    this.companyId = this.cookieService.organization();
    this.employeeId = this.cookieService.userID();
    this.getCompany(this.companyId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });
  }

  ngOnDestroy() {
    this.updateNotifications()
  }

  getCompany(id: any) {
    this.loading = true;
    this.companyService.fetchFullCompany(id).subscribe(
      (data) => {
        this.company = data;
        this.calculateProgress(data?.company)
        this.patchVisualDetails();
        this.patchContactDetails();
        this.patchValuesToSocialForm();
        this.patchNotifications(data?.company?.accountNotifications, data?.company?.marketingNotifications);
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

  addSocial() {
    this.loading = true;
    const social: any[] = [{
      id: this.generateRandomId(),
      facebook: this.socialForm.get('facebook')?.value,
      twitter: this.socialForm.get('twitter')?.value,
      linkedin: this.socialForm.get('linkedin')?.value,
      instagram: this.socialForm.get('instagram')?.value,
      github: this.socialForm.get('github')?.value
    }];
    this.companyService.addSocial({
      companyId: this.companyId,
      socialLinks: social
    }).subscribe((data) => {
      this.clear('social');
      this.getCompany(this.companyId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  updateSocial(id: any) {
    this.loading = true;
    this.companyService.editSocial(this.companyId, {
      id: id,
      facebook: this.socialForm.get('facebook')?.value,
      twitter: this.socialForm.get('twitter')?.value,
      linkedin: this.socialForm.get('linkedin')?.value,
      instagram: this.socialForm.get('instagram')?.value,
      github: this.socialForm.get('github')?.value
    }).subscribe((data) => {
      this.clear('social');
      this.getCompany(this.companyId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.clear('social');
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToSocialForm() {
    if (this.company?.socials) {
      this.company?.socials.forEach((social: any) => {
        this.socialForm.get('facebook')?.setValue(social?.socialLinks[0]?.facebook);
        this.socialForm.get('twitter')?.setValue(social?.socialLinks[0]?.twitter);
        this.socialForm.get('instagram')?.setValue(social?.socialLinks[0]?.instagram);
        this.socialForm.get('linkedin')?.setValue(social?.socialLinks[0]?.linkedin);
        this.socialForm.get('github')?.setValue(social?.socialLinks[0]?.github);
        this.editSocialLinksId = social.socialLinks[0].id;
      })
    }
  }

  changePass() {
    this.loading = true;
    if (this.changePassForm.valid) {
      this.credentialService.fetchCredentialByEmployeeId(this.employeeId).subscribe((data) => {
        if (data) {
          if (data.password === this.changePassForm.get('oldPass')?.value) {
            if (this.changePassForm.get('newPass')?.value === this.changePassForm.get('confirmPass')?.value) {
              this.credentialService.updateCredential(this.employeeId, {
                id:data.id,
                employeeId:this.employeeId,
                firstname:data.firstname,
                lastname:data.lastname,
                email:data.email,
                password:this.changePassForm.get('confirmPass')?.value,
                role:data.role,
                userLevel:data.userLevel
              }).subscribe((data) => {
                this.clear('changePass');
                this.loading = false;
                this.alertService.successMessage('Password updated successfully', 'Success');
              }, (error) => {
                this.loading = false;
                this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
              });
            } else {
              this.loading = false;
              this.alertService.errorMessage('Passwords do not match', 'Error');
            }
          } else {
            this.loading = false;
            this.alertService.errorMessage('Old password is incorrect', 'Error');
          }
        }
      }, (error) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
      })
    } else {
      this.loading = false;
      this.alertService.errorMessage('Please fill all the required fields', 'Error');
    }
  }

  updateNotifications() {
    this.companyService.updateNotifications({
      id: this.companyId,
      accountNotifications: {
        mention: this.aNotificationsForm.get('mention')?.value,
        follow: this.aNotificationsForm.get('follow')?.value,
        shareActivity: this.aNotificationsForm.get('share')?.value,
        message: this.aNotificationsForm.get('message')?.value
      },
      marketingNotifications: {
        promotion: this.mNotificationsForm.get('promotion')?.value,
        companyNews: this.mNotificationsForm.get('companyNews')?.value,
        weeklyJobs: this.mNotificationsForm.get('jobs')?.value,
        unsubscribe: this.mNotificationsForm.get('unsubscribe')?.value
      }
    }).subscribe((data) => {
      this.getCompany(this.companyId);
      this.alertService.successMessage('All applied changes are visible after refresh', 'Success');
    })
  }

  patchNotifications(account:any, marketing:any) {
    if (account){
      this.aNotificationsForm.get('mention')?.patchValue(account.mention);
      this.aNotificationsForm.get('follow')?.patchValue(account.follow);
      this.aNotificationsForm.get('share')?.patchValue(account.shareActivity);
      this.aNotificationsForm.get('message')?.patchValue(account.message);
    }
    if (marketing){
      this.mNotificationsForm.get('promotion')?.patchValue(marketing.promotion);
      this.mNotificationsForm.get('companyNews')?.patchValue(marketing.companyNews);
      this.mNotificationsForm.get('jobs')?.patchValue(marketing.weeklyJobs);
      this.mNotificationsForm.get('unsubscribe')?.patchValue(marketing.unsubscribe);
    }
  }

  deleteCompany() {
    this.loading = true;
    this.companyService.deleteCompany(this.companyId).subscribe((data) => {
      this.employeeService.deleteCompany(this.employeeId).subscribe((data) => {
        this.loading = false;
        this.alertService.successMessage('Company deleted successfully and you converted to a candidate', 'Success');
        this.router.navigate(['/']);
      }, (error) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
      })
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    })
    this.cookieService.logout()
    this.router.navigate(['/']);
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  clear(form: string) {
    switch (form) {
      case 'visual':
        this.visualDetailsForm.reset();
        break;
      case 'contact':
        this.contactForm.reset();
        break;
      case 'social':
        this.socialForm.reset();
        break;
      case 'changePass':
        this.changePassForm.reset();
        break;
      default:
        break;
    }
  }

  saveEverything() {
    this.updateNotifications();
    this.router.navigate(['/dashboard/business-profile-my']);
    this.alertService.successMessage('All applied changes are visible after refresh', 'Success');
  }
}
