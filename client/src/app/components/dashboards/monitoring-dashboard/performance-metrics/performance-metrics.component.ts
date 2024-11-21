import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";

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
  public lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit(): void {
    // Fetch all metric names
    this.monitoringService.getPerformanceMetrics().subscribe((response: any) => {
      this.metrics = response.names;
    });
  }

  onMetricSelect(): void {
    if (this.selectedMetric) {
      // Fetch data for the selected metric
      this.monitoringService.getMetricData(this.selectedMetric).subscribe((response: any) => {
        this.labels = response.measurements.map((_: any, index: any) => `Label ${index + 1}`);
        this.chartData = [
          {
            data: response.measurements.map((measurement: any) => measurement.value),
            label: this.selectedMetric,
          },
        ];
      });
    }
  }
}
