import { Component } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";
import {interval} from "rxjs";
import {Chart} from "chart.js";

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.scss']
})
export class ActiveUsersComponent {
  activeUserCount: number = 0;

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit() {
    interval(10000).subscribe(() => {
      this.monitoringService.getActiveUsers().subscribe((count) => {
        this.activeUserCount = count;
      });
    });

    this.monitoringService.fetchUserActivities().subscribe((data) => {
      const endpointCounts = data.reduce((acc: any, activity: any) => {
        acc[activity.endpointAccessed] = (acc[activity.endpointAccessed] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(endpointCounts);
      const counts = Object.values(endpointCounts);

      new Chart('activityChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Access Count',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}
