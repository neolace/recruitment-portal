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

  constructor(private fileUploadService: FileUploadService, private employeeService: EmployeeService, private toastr: ToastrService, private cookieService: AuthService) { }

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
      this.skillsFormGroup.reset();
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.successMessage('Skill added successfully', 'Success');
    }, (error) => {
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
    this.toastr.success(msg, title,{
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    });
  }

  errorMessage(msg: string, title: string) {
    this.toastr.error(msg, title,{
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
    });
  }

  warningMessage(msg: string, title: string) {
    this.toastr.warning(msg, title,{
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}
