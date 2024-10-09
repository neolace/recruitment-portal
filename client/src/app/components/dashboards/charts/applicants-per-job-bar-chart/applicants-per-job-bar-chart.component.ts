import {Component, Input} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-applicants-per-job-bar-chart',
  templateUrl: './applicants-per-job-bar-chart.component.html',
  styleUrls: ['./applicants-per-job-bar-chart.component.scss']
})
export class ApplicantsPerJobBarChartComponent {

  @Input() jobData: any[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Applicants' }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 0 }
    }
  };

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    if (this.jobData) {
      this.populateChartData();
      this.applyTheme();
    }
  }

  populateChartData() {
    const jobIds = this.jobData.map(job => job.jobId);
    const applicantCounts = this.jobData.map(job => job.applicants?.length);

    this.barChartData.labels = jobIds;
    this.barChartData.datasets[0].data = applicantCounts;
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const gridColor = this.themeService.isDarkMode() ? '#444444' : '#e0e0e0';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.barChartOptions = {
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
