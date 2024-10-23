import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Utilities} from "../../../shared/utilities/utilities";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ThemeService} from "../../../services/theme.service";
import {Router} from "@angular/router";
import {FileUploadService} from "../../../services/file-upload.service";
import {ReportIssueService} from "../../../services/report-issue.service";
import {CommonService} from "../../../services/common/common.service";
import {AlertsService} from "../../../services/alerts.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  @ViewChild('openForm') openForm!: ElementRef;
  @ViewChild('modelClose') modelClose!: ElementRef;

  utilities = Utilities;

  downloadURL?: any;

  reportIssueForm = new FormGroup({
    issueType: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })

  requestInfoForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(public themeService: ThemeService,
              private router: Router,
              private fileUploadService: FileUploadService,
              private reportIssueService: ReportIssueService,
              private commonService: CommonService,
              private alertService: AlertsService) {
  }

  ngOnInit(){
    if (sessionStorage.getItem('in_issue_progress') == 'true') {
      this.continueReportProgress();
    }
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
        sessionStorage.setItem('downloadURL', this.downloadURL);
      });
    }
  }

  generateRandomId(): any {
    let id: string;
    if (!sessionStorage.getItem('issue_id')) {
      id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('issue_id', id);
      return id;
    } else {
      return sessionStorage.getItem('issue_id');
    }
  }

  reportIssue() {
    if (this.reportIssueForm.valid) {
      sessionStorage.setItem('report_issue_form', JSON.stringify(this.reportIssueForm.value));
      if (this.downloadURL) {
        this.reportIssueService.addIssue({
          issueType: this.reportIssueForm.get('issueType')?.value,
          description: this.reportIssueForm.get('description')?.value,
          attachment: sessionStorage.getItem('downloadURL')
        }).subscribe((data) => {
          sessionStorage.clear();
          this.alertService.successMessage('Issue reported successfully.', 'Success');
          this.reportIssueForm.reset();
          this.downloadURL = null;
          const model_close = this.modelClose.nativeElement;
          model_close.click();
          return;
        }, (error) => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        })
      } else {
        const model_close = this.modelClose.nativeElement;
        model_close.click();
        sessionStorage.setItem('in_issue_progress', 'true');
        window.location.reload();
      }
    } else {
      this.alertService.errorMessage('Please fill in all required fields.', 'Error');
    }
  }

  continueReportProgress() {
    setTimeout(() => {
      const button: HTMLButtonElement = document.getElementById('openForm') as HTMLButtonElement;
      button.click();
    }, 1000)

    const reportIssueFormValue = sessionStorage.getItem('report_issue_form');
    if (reportIssueFormValue) {
      this.reportIssueForm.patchValue(JSON.parse(reportIssueFormValue));
      this.downloadURL = sessionStorage.getItem('downloadURL');

      if (this.downloadURL) {
        this.reportIssue()
      } else {
        this.alertService.errorMessage('Please add or upload again the attachment.', 'Error');
      }
    }
  }

  contactMe() {
    if (this.requestInfoForm.valid) {
      const mail = this.requestInfoForm.get('email')?.value;
      if (mail) {
        this.commonService.requestMoreData(mail).subscribe((data) => {
          this.alertService.successMessage('Email sent successfully.', 'Success');
          this.requestInfoForm.reset();
          return;
        }, (error) => {
          this.requestInfoForm.get('email')?.setValue('Error');
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        })
      }
    } else {
      this.alertService.errorMessage('Field is empty or invalid.', 'Error');
    }
  }
}
