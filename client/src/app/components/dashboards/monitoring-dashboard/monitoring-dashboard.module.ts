import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringDashboardRoutingModule } from './monitoring-dashboard-routing.module';
import { MonitoringDashboardComponent } from './monitoring-dashboard.component';
import {NgChartsModule} from "ng2-charts";
import {SharedMonitoringComponentsModule} from "../../../shared/modules/shared-monitoring-components.module";


@NgModule({
  declarations: [
    MonitoringDashboardComponent
  ],
    imports: [
        CommonModule,
        MonitoringDashboardRoutingModule,
        NgChartsModule,
        SharedMonitoringComponentsModule
    ]
})
export class MonitoringDashboardModule { }
