import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import * as moment from 'moment';
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-applicant-submission-dates-chart',
  templateUrl: './applicant-submission-dates-chart.component.html',
  styleUrls: ['./applicant-submission-dates-chart.component.scss']
})
export class ApplicantSubmissionDatesChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public chartOptions: ChartOptions<'bar'> = {
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

  public chartType: ChartType | any = 'bar'; // Change to 'line' for line chart
  public chartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  constructor(private themeService: ThemeService ) { }

  ngOnInit(): void {
    this.populateChartData();
    this.applyTheme();
  }

  populateChartData(): void {
    if (!this.jobData || this.jobData.length === 0) {
      return;
    }

    const dateSubmissionMap: { [date: string]: number } = {};

    // Loop through applicants and count submissions per date
    this.jobData.forEach(job => {
      job.applicants.forEach((applicant: any) => {
        if (applicant.date) {
          const submissionDate = moment(applicant.date).format('YYYY-MM-DD');
          if (!dateSubmissionMap[submissionDate]) {
            dateSubmissionMap[submissionDate] = 1;
          } else {
            dateSubmissionMap[submissionDate]++;
          }
        }
      });
    });

    // Extract dates and counts
    const dates = Object.keys(dateSubmissionMap).sort(); // Sort by date
    const counts = dates.map(date => dateSubmissionMap[date]);

    // Update chart data
    this.chartData.labels = dates;
    this.chartData.datasets = [{
      label: 'Applicant Submission Dates',
      data: counts,
      backgroundColor: '#42A5F5'
    }];
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const gridColor = this.themeService.isDarkMode() ? '#444444' : '#e0e0e0';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.chartOptions = {
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
