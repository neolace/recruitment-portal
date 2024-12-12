import { Component } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";
import {AlertsService} from "../../../../services/alerts.service";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent {
  userActivities: any[] = [];
  usersSet: Set<string> = new Set();
  userIPs: any[] = [];

  constructor(private monitoringService: MonitoringService, private alertService: AlertsService ) {}

  ngOnInit(): void {
    this.monitoringService.fetchUserActivities().subscribe(
      (data) => {
        this.userActivities = data;
        this.userActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        this.usersSet = new Set(this.userActivities.map((activity) => activity.ipAddress));
        this.userIPs = [...this.usersSet];
      },
      (error) => {
        console.error('Error fetching user activity data:', error);
      }
    );
  }

  clearUserActivities() {
    if (confirm('Make sure you backup your data before clearing user activity data. Are you sure you want to clear user activity data?')) {
      this.monitoringService.clearUserActivities().subscribe(
        () => {
          this.userActivities = [];
          this.alertService.successMessage('User activity data cleared successfully', 'Success');
          location.reload();
        },
        (error) => {
          location.reload();
        }
      );
    }
  }

  exportToCsv(users: any, title:any = 'data') {
    if (!users || !users.length) {
      this.alertService.warningMessage('No data to export', 'Warning');
      return;
    }

    const csvData = this.datasetToCsv(users);
    const dateString = new Date().toISOString().split('T')[0];
    this.downloadCsv(csvData, `${dateString}-${title}-data.csv`);
  }

  datasetToCsv(users: any[]): string {
    const headers = Object.keys(users[0]).join(',');

    const rows = users.map(user => {
      return Object.values(user).map(value => `"${value}"`).join(',');
    });

    return [headers, ...rows].join('\n');
  }

  downloadCsv(csv: string, filename: string) {
    const csvBlob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(csvBlob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
