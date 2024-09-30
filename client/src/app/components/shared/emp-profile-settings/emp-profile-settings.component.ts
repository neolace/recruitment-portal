import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {CredentialService} from "../../../services/credential.service";
import {Router} from "@angular/router";
import {AlertsService} from "../../../services/alerts.service";

declare var bootstrap: any;

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent implements OnInit, AfterViewInit, OnDestroy{
  countriesSet: any[] = countries

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  editSkills: boolean = false;
  editSkillId: any;
  editExperiences: boolean = false;
  editExperienceId: any;
  editContactId: any = null;
  editSocialLinksId: any = null;

  downloadURL?: any;

  personalFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    occupation: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    intro: new FormControl('')
  });

  searchAppearanceFormGroup = new FormGroup({
    expectedSalaryRange: new FormControl(''),
    currentExperience: new FormControl(''),
    keywords: new FormControl('', [Validators.max(40), Validators.min(3), Validators.maxLength(40), Validators.minLength(3)]),
  });

  skillsFormGroup = new FormGroup({
    skill: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required])
  });

  experienceFormGroup = new FormGroup({
    occupation: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required, Validators.email]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl(''),
    currentCheck: new FormControl(false),
    description: new FormControl('', [Validators.required])
  });

  contactFormGroup = new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zip: new FormControl(''),
    website: new FormControl(''),
  });

  socialFormGroup = new FormGroup({
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    instagram: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
  });

  changePassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required])
  });

  aNotificationsForm = new FormGroup({
    mention: new FormControl(false),
    follow: new FormControl(false),
    share: new FormControl(false),
    message: new FormControl(false)
  });

  mNotificationsForm = new FormGroup({
    promotion: new FormControl(false),
    companyNews: new FormControl(false),
    jobs: new FormControl(false),
    unsubscribe: new FormControl(false)
  });

  constructor(private fileUploadService: FileUploadService,
              private employeeService: EmployeeService,
              private credentialService: CredentialService,
              private alertService: AlertsService,
              private router: Router,
              private cookieService: AuthService) {
  }

  ngOnInit(): void {
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnDestroy() {
    this.updateNotifications()
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.patchValuesToPersonalForm();
        this.patchValuesToSearchAppearanceForm();
        this.patchValuesToContactForm();
        this.patchValuesToSocialForm();
        this.patchNotifications(data?.employee?.accountNotifications, data?.employee?.marketingNotifications);
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
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

  patchValuesToPersonalForm() {
    if (this.employee) {
      this.personalFormGroup.get('firstname')?.setValue(this.employee?.employee?.firstname);
      this.personalFormGroup.get('lastname')?.setValue(this.employee?.employee?.lastname);
      this.personalFormGroup.get('email')?.setValue(this.employee?.employee?.email);
      this.personalFormGroup.get('occupation')?.setValue(this.employee?.employee?.occupation);
      this.personalFormGroup.get('dob')?.setValue(this.employee?.employee?.dob);
      this.personalFormGroup.get('intro')?.setValue(this.employee?.employee?.intro);
    }
  }

  patchValuesToContactForm() {
    if (this.employee?.empContact) {
      this.employee?.empContact.forEach((contact: any) => {
        this.contactFormGroup.get('phone')?.setValue(contact?.contact[0]?.phone);
        this.contactFormGroup.get('email')?.setValue(contact?.contact[0]?.email);
        this.contactFormGroup.get('address')?.setValue(contact?.contact[0]?.address);
        this.contactFormGroup.get('city')?.setValue(contact?.contact[0]?.city);
        this.contactFormGroup.get('country')?.setValue(contact?.contact[0]?.country);
        this.contactFormGroup.get('zip')?.setValue(contact?.contact[0]?.zipCode);
        this.contactFormGroup.get('website')?.setValue(contact?.contact[0]?.website);
        this.editContactId = contact.contact[0].id;
      })
    }
  }

  patchValuesToSocialForm() {
    if (this.employee?.empContact) {
      this.employee?.empContact.forEach((social: any) => {
        this.socialFormGroup.get('facebook')?.setValue(social?.socialLinks[0]?.facebook);
        this.socialFormGroup.get('twitter')?.setValue(social?.socialLinks[0]?.twitter);
        this.socialFormGroup.get('instagram')?.setValue(social?.socialLinks[0]?.instagram);
        this.socialFormGroup.get('linkedin')?.setValue(social?.socialLinks[0]?.linkedin);
        this.socialFormGroup.get('github')?.setValue(social?.socialLinks[0]?.github);
        this.editSocialLinksId = social.socialLinks[0].id;
      })
    }
  }

  patchValuesToSearchAppearanceForm() {
    if (this.employee) {
      this.searchAppearanceFormGroup.get('expectedSalaryRange')?.setValue(this.employee?.employee?.expectedSalaryRange);
      this.searchAppearanceFormGroup.get('currentExperience')?.setValue(this.employee?.employee?.currentExperience);
      this.searchAppearanceFormGroup.get('keywords')?.setValue(this.employee?.employee?.keywords);
    }
  }

  savePersonalDetails() {
    this.loading = true;
    this.employeeService.updateEmployee({
      id: this.employee?.employee?.id,
      firstname: this.personalFormGroup.get('firstname')?.value,
      lastname: this.personalFormGroup.get('lastname')?.value,
      email: this.personalFormGroup.get('email')?.value,
      occupation: this.personalFormGroup.get('occupation')?.value,
      dob: this.personalFormGroup.get('dob')?.value,
      intro: this.personalFormGroup.get('intro')?.value
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Personal details updated successfully! Please refresh the page.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  saveSearchAppearance() {
    this.loading = true;
    this.employeeService.updateSearchAppearance({
      id: this.employee?.employee?.id,
      expectedSalaryRange: this.searchAppearanceFormGroup.get('expectedSalaryRange')?.value,
      currentExperience: this.searchAppearanceFormGroup.get('currentExperience')?.value,
      keywords: this.searchAppearanceFormGroup.get('keywords')?.value
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Search appearance updated successfully! Please refresh the page.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  saveSkills() {
    this.loading = true;
    this.employeeService.addSkills({
      employeeId: this.employeeId,
      skills: [{
        id: this.generateRandomId(),
        skill: this.skillsFormGroup.get('skill')?.value,
        percentage: this.skillsFormGroup.get('percentage')?.value
      }]
    }).subscribe((data) => {
      this.clear('skills');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Skill added successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteSkill(skillId: string) {
    this.employeeService.deleteSkill(this.employeeId, skillId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Skill deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editSkill() {
    this.employeeService.editSkill(this.employeeId, {
      id: this.editSkillId,
      skill: this.skillsFormGroup.get('skill')?.value,
      percentage: this.skillsFormGroup.get('percentage')?.value
    }).subscribe((data) => {
      this.clear('skills');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Skill updated successfully', 'Success');
    }, (error) => {
      this.clear('skills');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToSkillsForm(skill: any) {
    this.editSkills = true;
    if (this.employee) {
      this.skillsFormGroup.get('skill')?.setValue(skill.skill);
      this.skillsFormGroup.get('percentage')?.setValue(skill.percentage);
      this.editSkillId = skill.id;
    }
  }

  saveExperience() {
    this.loading = true;
    const ex: any[] = [{
      id: this.generateRandomId(),
      company: this.experienceFormGroup.get('company')?.value,
      position: this.experienceFormGroup.get('occupation')?.value,
      country: this.experienceFormGroup.get('country')?.value,
      startDate: this.experienceFormGroup.get('start')?.value,
      endDate: this.experienceFormGroup.get('currentCheck')?.value ? 'Present' : this.experienceFormGroup.get('end')?.value,
      description: this.experienceFormGroup.get('description')?.value
    }];
    this.employeeService.addExperience({
      employeeId: this.employeeId,
      experiences: ex
    }).subscribe((data) => {
      this.clear('experience');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteExperience(experienceId: string) {
    this.employeeService.deleteExperience(this.employeeId, experienceId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Experience deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editExperience() {
    this.employeeService.editExperience(this.employeeId, {
      id: this.editExperienceId,
      company: this.experienceFormGroup.get('company')?.value,
      position: this.experienceFormGroup.get('occupation')?.value,
      country: this.experienceFormGroup.get('country')?.value,
      startDate: this.experienceFormGroup.get('start')?.value,
      endDate: this.experienceFormGroup.get('currentCheck')?.value ? 'Present' : this.experienceFormGroup.get('end')?.value,
      description: this.experienceFormGroup.get('description')?.value
    }).subscribe((data) => {
      this.clear('experience');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.clear('experience');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToExperienceForm(experience: any) {
    this.editExperiences = true;
    if (this.employee) {
      this.experienceFormGroup.get('company')?.setValue(experience.company);
      this.experienceFormGroup.get('occupation')?.setValue(experience.position);
      this.experienceFormGroup.get('country')?.setValue(experience.country);
      this.experienceFormGroup.get('start')?.setValue(experience.startDate);
      this.experienceFormGroup.get('end')?.setValue(experience.endDate);
      this.experienceFormGroup.get('description')?.setValue(experience.description);
      this.experienceFormGroup.get('currentCheck')?.setValue(experience.endDate === 'Present');
      this.editExperienceId = experience.id;
    }
  }

  addContact() {
    this.loading = true;
    const contact: any[] = [{
      id: this.generateRandomId(),
      phone: this.contactFormGroup.get('phone')?.value,
      email: this.contactFormGroup.get('email')?.value,
      address: this.contactFormGroup.get('address')?.value,
      city: this.contactFormGroup.get('city')?.value,
      country: this.contactFormGroup.get('country')?.value,
      zipCode: this.contactFormGroup.get('zip')?.value,
      website: this.contactFormGroup.get('website')?.value
    }];
    this.employeeService.addContact({
      employeeId: this.employeeId,
      contact: contact
    }).subscribe((data) => {
      this.clear('contact');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  updateContact(id: any) {
    this.loading = true;
    this.employeeService.editContact(this.employeeId, {
      id: id,
      phone: this.contactFormGroup.get('phone')?.value,
      email: this.contactFormGroup.get('email')?.value,
      address: this.contactFormGroup.get('address')?.value,
      city: this.contactFormGroup.get('city')?.value,
      country: this.contactFormGroup.get('country')?.value,
      zipCode: this.contactFormGroup.get('zip')?.value,
      website: this.contactFormGroup.get('website')?.value
    }).subscribe((data) => {
      this.clear('contact');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.clear('contact');
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  addSocial() {
    this.loading = true;
    const social: any[] = [{
      id: this.generateRandomId(),
      facebook: this.socialFormGroup.get('facebook')?.value,
      twitter: this.socialFormGroup.get('twitter')?.value,
      linkedin: this.socialFormGroup.get('linkedin')?.value,
      instagram: this.socialFormGroup.get('instagram')?.value,
      github: this.socialFormGroup.get('github')?.value
    }];
    this.employeeService.addSocial({
      employeeId: this.employeeId,
      socialLinks: social
    }).subscribe((data) => {
      this.clear('social');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  updateSocial(id: any) {
    this.loading = true;
    this.employeeService.editSocial(this.employeeId, {
      id: id,
      facebook: this.socialFormGroup.get('facebook')?.value,
      twitter: this.socialFormGroup.get('twitter')?.value,
      linkedin: this.socialFormGroup.get('linkedin')?.value,
      instagram: this.socialFormGroup.get('instagram')?.value,
      github: this.socialFormGroup.get('github')?.value
    }).subscribe((data) => {
      this.clear('social');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.clear('social');
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
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
    this.employeeService.updateNotifications({
      id: this.employeeId,
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
      this.getEmployee(this.employeeId);
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

  deleteEmployee() {
    this.loading = true;
    this.employeeService.deleteEmployee(this.employeeId).subscribe((data) => {
      console.log(data);
      this.alertService.warningMessage('Account deleted permanently', 'Success');
    })
    this.cookieService.logout()
    this.router.navigate(['/']);
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
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;
        switch (location) {
          case 'resume':
            this.employeeService.updateResume({
              id: this.employeeId,
              resume: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.alertService.successMessage('Resume uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'cover':
            this.employeeService.updateCoverPic({
              id: this.employeeId,
              coverImage: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.alertService.successMessage('Cover image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'profile':
            this.employeeService.updateProfilePic({
              id: this.employeeId,
              image: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
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
      });
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  clear(form: string) {
    switch (form) {
      case 'skills':
        this.skillsFormGroup.reset();
        this.editSkills = false;
        this.editSkillId = '';
        break;
      case 'experience':
        this.experienceFormGroup.reset();
        this.editExperiences = false;
        this.editExperienceId = '';
        break;
      case 'contact':
        this.contactFormGroup.reset();
        break;
      case 'changePass':
        this.changePassForm.reset();
        break;
      default:
        break;
    }
  }
}
