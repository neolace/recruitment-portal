import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringDashboardComponent } from './monitoring-dashboard.component';

const routes: Routes = [{ path: '', component: MonitoringDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringDashboardRoutingModule { }
