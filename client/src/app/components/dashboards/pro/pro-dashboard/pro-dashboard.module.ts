import {NgModule} from "@angular/core";
import {ProDashboardComponent} from "./pro-dashboard.component";
import {ProMainDbComponent} from "../pro-main-db/pro-main-db.component";
import {CommonModule} from "@angular/common";
import {ProDashboardRoutingModule} from "./pro-dashboard-routing.module";
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";
import {SharedDashboardModule} from "../../../../shared/modules/shared-dashboard.module";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ProDashboardComponent,
    ProMainDbComponent
  ],
  imports: [
    CommonModule,
    ProDashboardRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    FormsModule,
    SharedPipesModule,
    SharedDashboardModule
  ],
  exports: []
})
export class ProDashboardModule {}
