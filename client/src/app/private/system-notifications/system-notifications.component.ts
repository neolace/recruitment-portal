import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SystemNotificationService} from "../../services/common/system-notification.service";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-system-notifications',
  templateUrl: './system-notifications.component.html',
  styleUrls: ['./system-notifications.component.scss']
})
export class SystemNotificationsComponent {
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: SystemNotificationService, private alertService: AlertsService) {
    this.notificationForm = this.fb.group({
      message: ['', [Validators.required, Validators.maxLength(200)]],
      startTime: ['', Validators.required],
      endTime: [''],
      url: [''],
      active: [true]
    });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      this.notificationService.createNotification(this.notificationForm.value).subscribe(
        response => {
          this.notificationForm.reset({ active: true });
          this.alertService.successMessage('Notification created successfully', 'Success');
        },
        error => {
          this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
        }
      );
    }
  }
}
