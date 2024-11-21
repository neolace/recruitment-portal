import {NgModule} from "@angular/core";
import {
  HealthMetricsComponent
} from "../../components/dashboards/monitoring-dashboard/health-metrics/health-metrics.component";
import {NgChartsModule} from "ng2-charts";
import {CommonModule, NgIf} from "@angular/common";
import {
  PerformanceMetricsComponent
} from "../../components/dashboards/monitoring-dashboard/performance-metrics/performance-metrics.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HealthMetricsComponent,
    PerformanceMetricsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    NgIf,
    FormsModule
  ],
  exports: [
    HealthMetricsComponent,
    PerformanceMetricsComponent
  ]
})
export class SharedMonitoringComponentsModule {}
