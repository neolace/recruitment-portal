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
import {CdkDragPlaceholder} from "@angular/cdk/drag-drop";
import {
  UserActivityComponent
} from "../../components/dashboards/monitoring-dashboard/user-activity/user-activity.component";

@NgModule({
  declarations: [
    HealthMetricsComponent,
    PerformanceMetricsComponent,
    UserActivityComponent
  ],
    imports: [
        CommonModule,
        NgChartsModule,
        NgIf,
        FormsModule,
        CdkDragPlaceholder
    ],
  exports: [
    HealthMetricsComponent,
    PerformanceMetricsComponent,
    UserActivityComponent
  ]
})
export class SharedMonitoringComponentsModule {}
