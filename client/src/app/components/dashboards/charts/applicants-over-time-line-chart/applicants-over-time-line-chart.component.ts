import {Component, Input} from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {ThemeService} from "../../../../services/theme.service";
import * as moment from "moment/moment";

@Component({
  selector: 'app-applicants-over-time-line-chart',
  templateUrl: './applicants-over-time-line-chart.component.html',
  styleUrl: './applicants-over-time-line-chart.component.scss'
})
export class ApplicantsOverTimeLineChartComponent {
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

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.populateChartData();
    this.applyTheme();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const dateApplyMap: { [date: string]: number } = {};

    // Loop through each job's applicants and count views per date
    this.jobData.forEach(job => {
      job.applicants.forEach((applicant: any) => {
        const applyDate = applicant.date ? moment(applicant.date).format('MM-DD') : 'Unknown';
        if (!dateApplyMap[applyDate]) {
          dateApplyMap[applyDate] = 1;
        } else {
          dateApplyMap[applyDate]++;
        }
      });
    });

    // Extract dates and counts
    const dates = Object.keys(dateApplyMap).sort(); // Sort by date
    const counts = dates.map(date => dateApplyMap[date]);

    // Update chart data
    this.lineChartData.labels = dates;
    this.lineChartData.datasets = [{
      label: 'Job Applicants Over Time',
      data: counts,
      borderColor: '#3e95cd',
      fill: false
    }];
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const gridColor = this.themeService.isDarkMode() ? '#444444' : '#e0e0e0';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.lineChartOptions = {
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
      },
      scales: {
        x: {
          ticks: {
            color: axisColor
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          ticks: {
            color: axisColor
          },
          grid: {
            color: gridColor
          }
        }
      }
    };
  }
}
