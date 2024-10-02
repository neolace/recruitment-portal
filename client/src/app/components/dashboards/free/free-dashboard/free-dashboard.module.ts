import {NgModule} from "@angular/core";
import {FreeMainDbComponent} from "../free-main-db/free-main-db.component";
import {FreeDashboardComponent} from "./free-dashboard.component";
import {CommonModule} from "@angular/common";
import {FreeDashboardRoutingModule} from "./free-dashboard-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";
import {SharedPipesModule} from "../../../../shared/modules/shared-pipes.module";
import {SharedDashboardModule} from "../../../../shared/modules/shared-dashboard.module";
import {ApplicantsDbComponent} from "../applicants-db/applicants-db.component";
import {SharedChartsComponentModule} from "../../../../shared/modules/shared-charts-component.module";
import {SharedComponentModule} from "../../../../shared/modules/shared-component.module";
import {CompanyAnalysisComponent} from "../company-analysis/company-analysis.component";

@NgModule({
  declarations: [
    FreeMainDbComponent,
    FreeDashboardComponent,
    ApplicantsDbComponent,
    CompanyAnalysisComponent
  ],
  imports: [
    CommonModule,
    FreeDashboardRoutingModule,
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
    SharedDashboardModule,
    SharedChartsComponentModule,
    SharedComponentModule
  ],
  exports: []
})
export class FreeDashboardModule {}
