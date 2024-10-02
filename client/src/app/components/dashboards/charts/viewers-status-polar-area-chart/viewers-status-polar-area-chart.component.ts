import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-viewers-status-polar-area-chart',
  templateUrl: './viewers-status-polar-area-chart.component.html',
  styleUrls: ['./viewers-status-polar-area-chart.component.scss']
})
export class ViewersStatusPolarAreaChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public polarAreaChartOptions: ChartOptions<'polarArea'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public polarAreaChartType: ChartType | any = 'polarArea';

  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  ngOnInit(): void {
    this.populateChartData();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const statusCountMap: { [status: string]: number } = {};

    // Loop through each job's viewers and count their statuses
    this.jobData.forEach(job => {
      job.viewers.forEach((viewer: any) => {
        const status = viewer.status || 'Unknown';
        if (!statusCountMap[status]) {
          statusCountMap[status] = 1;
        } else {
          statusCountMap[status]++;
        }
      });
    });

    // Extract statuses and counts
    const statuses = Object.keys(statusCountMap);
    const counts = Object.values(statusCountMap);

    // Update chart data
    this.polarAreaChartData.labels = statuses;
    this.polarAreaChartData.datasets[0].data = counts;
  }
}
