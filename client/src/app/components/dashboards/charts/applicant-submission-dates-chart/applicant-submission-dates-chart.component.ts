import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import * as moment from 'moment';

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

  ngOnInit(): void {
    this.populateChartData();
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
}
