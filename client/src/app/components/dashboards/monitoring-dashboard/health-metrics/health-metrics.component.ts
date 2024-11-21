import { Component, OnInit } from '@angular/core';
import {MonitoringService} from "../../../../services/monitoring.service";

@Component({
  selector: 'app-health-metrics',
  templateUrl: './health-metrics.component.html',
  styleUrls: ['./health-metrics.component.scss']
})
export class HealthMetricsComponent implements OnInit {
  healthMetrics: any = [];
  overallStatus: string = '';

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit(): void {
    this.monitoringService.getHealthMetrics().subscribe((data: any) => {
      // Extract and transform the health metrics
      this.overallStatus = data.status;
      this.healthMetrics = Object.entries(data.components).map(([key, value]: any) => {
        return {
          name: key,
          status: value.status,
          details: value.details
        };
      });
    });
  }
}
