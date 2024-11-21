import {Component, OnInit} from '@angular/core';
import {ChartDataset, ChartOptions} from "chart.js";
import {MonitoringService} from "../../../../services/monitoring.service";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss']
})
export class PerformanceMetricsComponent implements OnInit{
  performanceMetrics: ChartDataset<'line'>[] = [];
  labels: string[] = [];
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(private monitoringService: MonitoringService, private themeService: ThemeService ) {}

  ngOnInit() {
    this.monitoringService.getPerformanceMetrics().subscribe(data => {
      this.performanceMetrics = [
        {
          data: data.names, // Replace with the correct field from your API response
          label: 'Performance',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          fill: true
        }
      ];
      this.labels = data.names; // Replace with the correct field from your API response
    });

    this.applyTheme()
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
