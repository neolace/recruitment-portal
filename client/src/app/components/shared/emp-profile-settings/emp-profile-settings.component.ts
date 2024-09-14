import {Component, OnInit} from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent implements OnInit {
  countriesSet: any[] = countries

  employee: any
  employeeId: any = '66e31aa7217eb911ad764373'
  loading: boolean = false;

  downloadURL?: any;

  personalFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    occupation: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    intro: new FormControl('')
  });

  constructor(private fileUploadService: FileUploadService, private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEmployee(this.employeeId);
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.patchValuesToPersonalForm();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage('Something went wrong! Please try again', 'Error');
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
      this.successMessage('Personal details updated successfully', 'Success');
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
