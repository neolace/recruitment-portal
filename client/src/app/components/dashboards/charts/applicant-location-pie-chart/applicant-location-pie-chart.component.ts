import {Component, Input} from '@angular/core';
import {ChartData, ChartOptions, ChartType} from "chart.js";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-applicant-location-pie-chart',
  templateUrl: './applicant-location-pie-chart.component.html',
  styleUrls: ['./applicant-location-pie-chart.component.scss']
})
export class ApplicantLocationPieChartComponent {

  @Input() jobData: any[] = [];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  public pieChartType: ChartType | any = 'pie';

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: []
    }]
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

    const locationCountMap: { [key: string]: number } = {};

    // Loop through job applicants to count applicants by location
    this.jobData.forEach(job => {
      job.applicants.forEach((applicant: any) => {
        const location = applicant.location || 'Unknown';
        if (!locationCountMap[location]) {
          locationCountMap[location] = 1;
        } else {
          locationCountMap[location]++;
        }
      });
    });

    // Extract locations and counts from the map
    const locations = Object.keys(locationCountMap);
    const counts = Object.values(locationCountMap);

    // Update chart data
    this.pieChartData.labels = locations;
    this.pieChartData.datasets[0].data = counts;
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
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
