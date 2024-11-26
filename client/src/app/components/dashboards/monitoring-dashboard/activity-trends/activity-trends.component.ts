import { Component } from '@angular/core';
import {Chart, ChartData, ChartOptions} from "chart.js";
import {MonitoringService} from "../../../../services/monitoring.service";

@Component({
  selector: 'app-activity-trends',
  templateUrl: './activity-trends.component.html',
  styleUrls: ['./activity-trends.component.scss']
})
export class ActivityTrendsComponent {
  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartOptions: ChartOptions = { responsive: true };

  constructor(private activityService: MonitoringService) {}

  ngOnInit() {
    this.activityService.getActivityTrends('hourly').subscribe(data => {
      const labels = Object.keys(data);
      new Chart('lineChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'User Activity',
              data: Object.values(data),
              fill: false,
              borderColor: 'blue',
              tension: 0.1
            },
          ],
        },
      });
    });
  }
}
