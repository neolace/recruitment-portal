import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";
import {ThemeService} from "../../../../services/theme.service";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-performance-metrics',
  templateUrl: './performance-metrics.component.html',
  styleUrls: ['./performance-metrics.component.scss']
})
export class PerformanceMetricsComponent implements OnInit {
  metrics: string[] = []; // To store all available metrics
  selectedMetric: string = ''; // To store the selected metric
  chartData: any = []; // To store chart data
  labels: string[] = []; // To store labels for the chart

  // Chart Options
  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  constructor(private monitoringService: MonitoringService, private themeService: ThemeService) {}

  ngOnInit(): void {
    // Fetch all metric names
    this.monitoringService.getPerformanceMetrics().subscribe((response: any) => {
      this.metrics = response.names;
    });

    this.applyTheme()
  }

  onMetricSelect(): void {
    if (this.selectedMetric) {
      // Fetch data for the selected metric
      this.monitoringService.getMetricData(this.selectedMetric).subscribe((response: any) => {
        this.labels = response.measurements.map((_: any, index: any) => `${_.statistic ? _.statistic : 'Label ' + index + 1}`);
        this.chartData = [
          {
            data: response.measurements.map((measurement: any) => measurement.value),
            label: response.description ? response.description : response.name ? response.name : 'Metric',
          },
        ];
      });

      this.applyTheme()
    }
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
