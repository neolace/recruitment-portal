import { Component } from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent {
  countriesSet: any[] = countries

  employeeId: any = '1'

  downloadURL?: any;

  constructor(private fileUploadService: FileUploadService ) { }

  ngOnInit(): void { }

  uploadFile(event: any, filePath: string) {
    const file = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;  // Store this URL in the MongoDB backend
      });
    }
  }
}
