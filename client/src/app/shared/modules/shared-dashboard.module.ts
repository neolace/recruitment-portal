import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PersonalProfileMyComponent
} from "../../components/dashboards/free/personal-profile-my/personal-profile-my.component";
import {
  PersonalProfileSettingsComponent
} from "../../components/dashboards/free/personal-profile-settings/personal-profile-settings.component";
import {
  BusinessProfileMyComponent
} from "../../components/dashboards/free/business-profile-my/business-profile-my.component";
import {
  BusinessProfileSettingsComponent
} from "../../components/dashboards/free/business-profile-settings/business-profile-settings.component";
import {CompanyJobsMyComponent} from "../../components/dashboards/free/company-jobs-my/company-jobs-my.component";



@NgModule({
  declarations: [
    PersonalProfileMyComponent,
    PersonalProfileSettingsComponent,
    BusinessProfileMyComponent,
    BusinessProfileSettingsComponent,
    CompanyJobsMyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PersonalProfileMyComponent,
    PersonalProfileSettingsComponent,
    BusinessProfileMyComponent,
    BusinessProfileSettingsComponent,
    CompanyJobsMyComponent
  ]
})
export class SharedDashboardModule { }
