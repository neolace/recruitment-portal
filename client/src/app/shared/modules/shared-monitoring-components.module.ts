import {NgModule} from "@angular/core";
import {
  HealthMetricsComponent
} from "../../components/dashboards/monitoring-dashboard/health-metrics/health-metrics.component";
import {NgChartsModule} from "ng2-charts";
import {CommonModule, NgIf} from "@angular/common";

@NgModule({
  declarations: [
    HealthMetricsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgIf
  ],
  exports: [
    HealthMetricsComponent
  ]
})
export class SharedMonitoringComponentsModule {}
