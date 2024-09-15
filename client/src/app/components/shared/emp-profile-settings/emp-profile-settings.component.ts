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
        console.log(this.employee);
        this.patchValuesToPersonalForm();
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
      default:
        break;
    }
  }
}
