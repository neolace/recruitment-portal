import {RouterModule, Routes} from "@angular/router";
import {ProDashboardComponent} from "./pro-dashboard.component";
import {ProMainDbComponent} from "../pro-main-db/pro-main-db.component";
import {PersonalProfileMyComponent} from "../../free/personal-profile-my/personal-profile-my.component";
import {
  PersonalProfileSettingsComponent
} from "../../free/personal-profile-settings/personal-profile-settings.component";
import {BusinessProfileMyComponent} from "../../free/business-profile-my/business-profile-my.component";
import {
  BusinessProfileSettingsComponent
} from "../../free/business-profile-settings/business-profile-settings.component";
import {CompanyJobsMyComponent} from "../../free/company-jobs-my/company-jobs-my.component";
import {NgModule} from "@angular/core";
import {AdminProGuard} from "../../../../guards/admin-pro.guard";
import {AuthGuard} from "../../../../guards/auth.guard";
import {AdminGuard} from "../../../../guards/admin.guard";
import {ProApplicantsDbComponent} from "../pro-applicants-db/pro-applicants-db.component";
import {JobPostComponent} from "../../free/job-post/job-post.component";
import {ProCompanyAnalysisComponent} from "../pro-company-analysis/pro-company-analysis.component";

const routes: Routes = [
  {
    path: '',
    component: ProDashboardComponent,
    children: [
      { path: '', redirectTo: '/pro/overview', pathMatch: 'full' },
      { path: 'overview', component: ProMainDbComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'personal-profile', component: PersonalProfileMyComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'personal-profile-settings', component: PersonalProfileSettingsComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'business-profile-my', component: BusinessProfileMyComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'business-profile-settings', component: BusinessProfileSettingsComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'post-job', component: JobPostComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'company-jobs', component: CompanyJobsMyComponent, canActivate: [AdminProGuard, AuthGuard] },
      { path: 'applicants', component: ProApplicantsDbComponent, canActivate: [AdminProGuard, AdminGuard] },
      { path: 'company-analysis', component: ProCompanyAnalysisComponent, canActivate: [AdminProGuard, AdminGuard] }
    ],
    canActivate: [AdminProGuard, AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProDashboardRoutingModule {}
