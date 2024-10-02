import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-job-viewers-over-time-line-chart',
  templateUrl: './job-viewers-over-time-line-chart.component.html',
  styleUrls: ['./job-viewers-over-time-line-chart.component.scss']
})
export class JobViewersOverTimeLineChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public lineChartType: ChartType | any = 'line';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    this.populateChartData();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const dateViewMap: { [date: string]: number } = {};

    // Loop through each job's viewers and count views per date
    this.jobData.forEach(job => {
      job.viewers.forEach((viewer: any) => {
        const viewDate = viewer.date ? moment(viewer.date).format('YYYY-MM-DD') : 'Unknown';
        if (!dateViewMap[viewDate]) {
          dateViewMap[viewDate] = 1;
        } else {
          dateViewMap[viewDate]++;
        }
      });
    });

    // Extract dates and counts
    const dates = Object.keys(dateViewMap).sort(); // Sort by date
    const counts = dates.map(date => dateViewMap[date]);

    // Update chart data
    this.lineChartData.labels = dates;
    this.lineChartData.datasets = [{
      label: 'Job Viewers Over Time',
      data: counts,
      borderColor: '#3e95cd',
      fill: false
    }];
  }
}
