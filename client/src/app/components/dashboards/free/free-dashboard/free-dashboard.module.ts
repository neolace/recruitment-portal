import {NgModule} from "@angular/core";
import {FreeMainDbComponent} from "../free-main-db/free-main-db.component";
import {FreeDashboardComponent} from "./free-dashboard.component";
import {PersonalProfileMyComponent} from "../personal-profile-my/personal-profile-my.component";
import {PersonalProfileSettingsComponent} from "../personal-profile-settings/personal-profile-settings.component";
import {BusinessProfileMyComponent} from "../business-profile-my/business-profile-my.component";
import {BusinessProfileSettingsComponent} from "../business-profile-settings/business-profile-settings.component";
import {CompanyJobsMyComponent} from "../company-jobs-my/company-jobs-my.component";
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

@NgModule({
  declarations: [
    FreeMainDbComponent,
    FreeDashboardComponent
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
    SharedDashboardModule
  ],
  exports: []
})
export class FreeDashboardModule {}
