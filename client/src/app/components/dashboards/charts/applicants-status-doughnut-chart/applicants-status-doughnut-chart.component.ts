import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-applicants-status-doughnut-chart',
  templateUrl: './applicants-status-doughnut-chart.component.html',
  styleUrls: ['./applicants-status-doughnut-chart.component.scss']
})
export class ApplicantsStatusDoughnutChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public doughnutChartType: ChartType | any = 'doughnut';

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.populateChartData();
    this.applyTheme();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const statusCountMap: { [status: string]: number } = {};

    // Loop through each applicant's status and count occurrences
    this.jobData?.forEach(job => {
      job.applicants?.forEach((applicant: any) => {
        const status = applicant.status || 'Unknown';
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
    this.doughnutChartData.labels = statuses;
    this.doughnutChartData.datasets[0].data = counts;
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.doughnutChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: axisColor
          }
        },
        tooltip: {
          backgroundColor: tooltipBackgroundColor,
          titleColor: tooltipFontColor,
          bodyColor: tooltipFontColor,
        }
      }
    };
  }
}
