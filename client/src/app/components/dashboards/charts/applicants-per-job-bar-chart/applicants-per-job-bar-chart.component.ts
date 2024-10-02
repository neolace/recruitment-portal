import {Component, Input} from '@angular/core';
import {ChartConfiguration, ChartOptions} from "chart.js";

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

  ngOnInit(): void {
    if (this.jobData) {
      this.populateChartData();
    }
  }

  populateChartData() {
    const jobIds = this.jobData.map(job => job.jobId);
    const applicantCounts = this.jobData.map(job => job.applicants.length);

    this.barChartData.labels = jobIds;
    this.barChartData.datasets[0].data = applicantCounts;
  }
}
