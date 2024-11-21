import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringDashboardRoutingModule } from './monitoring-dashboard-routing.module';
import { MonitoringDashboardComponent } from './monitoring-dashboard.component';
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    MonitoringDashboardComponent
  ],
    imports: [
        CommonModule,
        MonitoringDashboardRoutingModule,
        NgChartsModule
    ]
})
export class MonitoringDashboardModule { }
