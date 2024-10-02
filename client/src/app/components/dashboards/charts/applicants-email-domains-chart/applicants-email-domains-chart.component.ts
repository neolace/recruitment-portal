import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-applicants-email-domains-chart',
  templateUrl: './applicants-email-domains-chart.component.html',
  styleUrls: ['./applicants-email-domains-chart.component.scss']
})
export class ApplicantsEmailDomainsChartComponent implements OnInit {
  @Input() jobData: any[] = [];

  public pieChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    }
  };

  public pieChartType: ChartType | any = 'bar';

  public pieChartData: ChartData<'bar'> = {
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

    const emailDomainMap: { [domain: string]: number } = {};

    // Loop through applicants and count domains
    this.jobData.forEach(job => {
      job.applicants.forEach((applicant: any) => {
        if (applicant.email) {
          const domain = this.extractDomainFromEmail(applicant.email);
          if (!emailDomainMap[domain]) {
            emailDomainMap[domain] = 1;
          } else {
            emailDomainMap[domain]++;
          }
        }
      });
    });

    // Extract domains and counts
    const domains = Object.keys(emailDomainMap);
    const counts = domains.map(domain => emailDomainMap[domain]);

    // Update chart data
    this.pieChartData.labels = domains;
    this.pieChartData.datasets = [{
      data: counts,
      label: 'Email Domains',
      backgroundColor: this.generateColors(domains.length)
    }];
  }

  extractDomainFromEmail(email: string): string {
    return email.split('@')[1];
  }

  applyTheme(): void {
    const axisColor = this.themeService.isDarkMode() ? '#fff' : '#222';
    const gridColor = this.themeService.isDarkMode() ? '#444444' : '#e0e0e0';
    const tooltipBackgroundColor = this.themeService.isDarkMode() ? '#333333' : '#ffffff';
    const tooltipFontColor = this.themeService.isDarkMode() ? '#fff' : '#222';

    this.pieChartOptions = {
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

  generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`hsl(${Math.floor(Math.random() * 360)}, 100%, 75%)`);
    }
    return colors;
  }
}
