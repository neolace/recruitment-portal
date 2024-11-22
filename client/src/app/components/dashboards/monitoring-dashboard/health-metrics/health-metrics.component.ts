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
  serverUpTime: string = '';

  freeDiskSpace: number = 0;
  totalDiskSpace: number = 0;
  freeSpacePercentage: number = 0;
  usedSpacePercentage: number = 0;
  progressBarClass: string = '';

  constructor(private monitoringService: MonitoringService) {}

  ngOnInit(): void {
    this.monitoringService.getHealthMetrics().subscribe((data: any) => {
      // Extract and transform the health metrics
      this.overallStatus = data.status;
      this.serverUpTime = data.components.uptime.details.uptime;
      this.healthMetrics = Object.entries(data.components).map(([key, value]: any) => {
        return {
          name: key,
          status: value.status,
          details: value.details
        };
      });
      // Extract disk space data
      const diskSpace = data.components.diskSpace.details;
      this.freeDiskSpace = diskSpace.free / 1024 / 1024 / 1024;
      this.totalDiskSpace = diskSpace.total / 1024 / 1024 / 1024;

      // Calculate the percentage of free space
      this.freeSpacePercentage = (this.freeDiskSpace / this.totalDiskSpace) * 100;
      this.usedSpacePercentage = ((this.totalDiskSpace - this.freeDiskSpace) / this.totalDiskSpace) * 100;
      if (this.freeSpacePercentage < 20 || this.usedSpacePercentage > 80) {
        this.progressBarClass = 'low';
      } else if (this.freeSpacePercentage < 50 || this.usedSpacePercentage > 50) {
        this.progressBarClass = 'medium';
      } else if(this.freeSpacePercentage < 80 || this.usedSpacePercentage > 20) {
        this.progressBarClass = 'high';
      }
    });
  }
}
