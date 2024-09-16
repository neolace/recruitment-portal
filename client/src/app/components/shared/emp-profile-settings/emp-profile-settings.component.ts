import {AfterViewInit, Component, OnInit} from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent implements OnInit, AfterViewInit {
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

  constructor(private fileUploadService: FileUploadService, private employeeService: EmployeeService, private toastr: ToastrService, private cookieService: AuthService) {
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
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.patchValuesToPersonalForm();
        this.patchValuesToContactForm();
        this.patchValuesToSocialForm();
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
      this.successMessage('Personal details updated successfully! Please refresh the page.', 'Success');
    }, (error) => {
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Skill added successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteSkill(skillId: string) {
    this.employeeService.deleteSkill(this.employeeId, skillId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Skill deleted successfully', 'Success');
    }, (error) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Skill updated successfully', 'Success');
    }, (error) => {
      this.clear('skills');
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteExperience(experienceId: string) {
    this.employeeService.deleteExperience(this.employeeId, experienceId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.successMessage('Experience deleted successfully', 'Success');
    }, (error) => {
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.clear('experience');
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.clear('contact');
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
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
      this.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.clear('social');
      this.loading = false;
      this.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  uploadFile(event: any, filePath: string, location: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.warningMessage('File size exceeds the maximum limit of 2MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.warningMessage('Only PNG, JPEG, and PDF files are allowed.', 'Warning');
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
              this.successMessage('Resume uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'cover':
            this.employeeService.updateCoverPic({
              id: this.employeeId,
              coverImage: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.successMessage('Cover image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'profile':
            this.employeeService.updateProfilePic({
              id: this.employeeId,
              image: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.successMessage('Profile image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.errorMessage('Something went wrong. Please try again.', 'Error');
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
      default:
        break;
    }
  }
}
