import {RouterModule, Routes} from "@angular/router";
import {PersonalProfileSettingsComponent} from "../personal-profile-settings/personal-profile-settings.component";
import {CompanyJobsMyComponent} from "../company-jobs-my/company-jobs-my.component";
import {FreeDashboardComponent} from "./free-dashboard.component";
import {BusinessProfileMyComponent} from "../business-profile-my/business-profile-my.component";
import {FreeMainDbComponent} from "../free-main-db/free-main-db.component";
import {BusinessProfileSettingsComponent} from "../business-profile-settings/business-profile-settings.component";
import {PersonalProfileMyComponent} from "../personal-profile-my/personal-profile-my.component";
import {NgModule} from "@angular/core";
import {AdminGuard} from "../../../../guards/admin.guard";
import {AuthGuard} from "../../../../guards/auth.guard";
import {ApplicantsDbComponent} from "../applicants-db/applicants-db.component";
import {CompanyAnalysisComponent} from "../company-analysis/company-analysis.component";
import {BillingAndUsageComponent} from "../billing-and-usage/billing-and-usage.component";

const routes: Routes = [
  {
    path: '',
    component: FreeDashboardComponent,
    children: [
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
      { path: 'overview', component: FreeMainDbComponent, canActivate: [AdminGuard, AuthGuard] },
      { path: 'personal-profile', component: PersonalProfileMyComponent, canActivate: [AdminGuard] },
      { path: 'personal-profile-settings', component: PersonalProfileSettingsComponent, canActivate: [AdminGuard] },
      { path: 'business-profile-my', component: BusinessProfileMyComponent, canActivate: [AdminGuard] },
      { path: 'business-profile-settings', component: BusinessProfileSettingsComponent, canActivate: [AdminGuard] },
      { path: 'company-jobs', component: CompanyJobsMyComponent, canActivate: [AdminGuard] },
      { path: 'applicants', component: ApplicantsDbComponent, canActivate: [AdminGuard] },
      { path: 'company-analysis', component: CompanyAnalysisComponent, canActivate: [AdminGuard] },
      { path: 'billing', component: BillingAndUsageComponent, canActivate: [AdminGuard] }
    ],
    canActivate: [AdminGuard, AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeDashboardRoutingModule {}
