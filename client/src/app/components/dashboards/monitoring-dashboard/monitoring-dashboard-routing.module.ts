import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringDashboardComponent } from './monitoring-dashboard.component';
import {AdminProGuard} from "../../../guards/admin-pro.guard";

const routes: Routes = [{ path: '', component: MonitoringDashboardComponent, canActivate: [AdminProGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringDashboardRoutingModule { }
