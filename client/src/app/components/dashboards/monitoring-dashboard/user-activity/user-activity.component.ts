import { Component } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss']
})
export class UserActivityComponent {
  userActivities: any[] = [];

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit(): void {
    this.monitoringService.fetchUserActivities().subscribe(
      (data) => {
        this.userActivities = data;
      },
      (error) => {
        console.error('Error fetching user activity data:', error);
      }
    );
  }
}
