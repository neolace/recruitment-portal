import {Component, OnInit} from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";

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

  constructor(private fileUploadService: FileUploadService, private employeeService: EmployeeService ) { }

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
        console.error('Error fetching employee data', error);
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
    }, (error) => {
      console.error('Error updating employee data', error);
      this.loading = false;
    });
  }

  uploadFile(event: any, filePath: string, location: string) {
    const file = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;
        switch (location) {
          case 'resume':
            // update resume
            break;
          case 'cover':
            // update cover
            break;
          case 'profile':
            // update profile
            break;
          default:
            break;
        }
      });
    }
  }
}
