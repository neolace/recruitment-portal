import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {JobDetailsComponent} from "./components/shared/job-details/job-details.component";
import {JobComponent} from "./components/job/job.component";
import {JobApplyComponent} from "./components/shared/job-apply/job-apply.component";
import {JobPostComponent} from "./components/shared/job-post/job-post.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {EmpProfileComponent} from "./components/shared/emp-profile/emp-profile.component";
import {EmpProfileSettingsComponent} from "./components/shared/emp-profile-settings/emp-profile-settings.component";
import {LockScreenComponent} from "./components/lock-screen/lock-screen.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {FreeDashboardComponent} from "./components/dashboards/free/free-dashboard/free-dashboard.component";
import {FreeMainDbComponent} from "./components/dashboards/free/free-main-db/free-main-db.component";
import {BusinessProfileComponent} from "./components/business-profile/business-profile.component";
import {
  BusinessProfileSettingsComponent
} from "./components/dashboards/free/business-profile-settings/business-profile-settings.component";
import {
  BusinessProfileMyComponent
} from "./components/dashboards/free/business-profile-my/business-profile-my.component";
import {PrisingComponent} from "./components/prising/prising.component";
import {CompaniesComponent} from "./components/companies/companies.component";
import {CompanyJobsComponent} from "./components/company-jobs/company-jobs.component";
import {CompanyJobsMyComponent} from "./components/dashboards/free/company-jobs-my/company-jobs-my.component";
import {ProDashboardComponent} from "./components/dashboards/pro/pro-dashboard/pro-dashboard.component";
import {ProMainDbComponent} from "./components/dashboards/pro/pro-main-db/pro-main-db.component";
import {EmpSavedJobsComponent} from "./components/shared/emp-saved-jobs/emp-saved-jobs.component";
import {
  EmpSavedJobsSavedComponent
} from "./components/shared/emp-saved-jobs/emp-saved-jobs-saved/emp-saved-jobs-saved.component";
import {
  EmpSavedJobsInprogressComponent
} from "./components/shared/emp-saved-jobs/emp-saved-jobs-inprogress/emp-saved-jobs-inprogress.component";
import {
  EmpSavedJobsAppliedComponent
} from "./components/shared/emp-saved-jobs/emp-saved-jobs-applied/emp-saved-jobs-applied.component";
import {
  EmpSavedJobsArchivedComponent
} from "./components/shared/emp-saved-jobs/emp-saved-jobs-archived/emp-saved-jobs-archived.component";
import {
  PersonalProfileMyComponent
} from "./components/dashboards/free/personal-profile-my/personal-profile-my.component";
import {
  PersonalProfileSettingsComponent
} from "./components/dashboards/free/personal-profile-settings/personal-profile-settings.component";
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {TermsConditionsComponent} from "./components/terms-conditions/terms-conditions.component";
import {JobsLearnMoreComponent} from "./components/shared/jobs-learn-more/jobs-learn-more.component";
import {FaqComponent} from "./components/faq/faq.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) },
  { path: 'job', loadChildren: () => import('./components/job/job.module').then(m => m.JobModule) },
  { path: 'job-details/:id', loadChildren: () => import('./components/shared/job-details/job-details.module').then(m => m.JobDetailsModule) },
  { path: 'job-apply', loadChildren: () => import('./components/shared/job-apply/job-apply.module').then(m => m.JobApplyModule) },
  { path: 'job-post', component: JobPostComponent },
  { path: 'learn-more-jobs', component: JobsLearnMoreComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'pricing', component: PrisingComponent },
  { path: 'candidate-profile', loadChildren: () => import('./components/shared/emp-profile/emp-profile.module').then(m => m.EmpProfileModule) },
  { path: 'candidate-profile-setting', loadChildren: () => import('./components/shared/emp-profile-settings/emp-profile-settings.module').then(m => m.EmpProfileSettingsModule) },
  { path: 'my-jobs', component: EmpSavedJobsComponent, children: [
      { path: '', redirectTo: '/my-jobs/saved', pathMatch: 'full' },
      { path: 'saved', component: EmpSavedJobsSavedComponent },
      { path: 'inprogress', component: EmpSavedJobsInprogressComponent },
      { path: 'applied', component: EmpSavedJobsAppliedComponent },
      { path: 'archived', component: EmpSavedJobsArchivedComponent }
  ]},
  { path: 'business-profile/:id', component: BusinessProfileComponent },
  { path: 'company-jobs/:id', component: CompanyJobsComponent },
  { path: 'locked', component: LockScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsConditionsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'dashboard', component: FreeDashboardComponent, children: [
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
      { path: 'overview', component: FreeMainDbComponent },
      { path: 'personal-profile', component: PersonalProfileMyComponent },
      { path: 'personal-profile-settings', component: PersonalProfileSettingsComponent },
      { path: 'business-profile-my', component: BusinessProfileMyComponent },
      { path: 'business-profile-settings', component: BusinessProfileSettingsComponent },
      { path: 'company-jobs', component: CompanyJobsMyComponent }
  ]},
  { path: 'pro', component: ProDashboardComponent, children: [
      { path: '', redirectTo: '/pro/overview', pathMatch: 'full' },
      { path: 'overview', component: ProMainDbComponent },
      { path: 'personal-profile', component: PersonalProfileMyComponent },
      { path: 'personal-profile-settings', component: PersonalProfileSettingsComponent },
      { path: 'business-profile-my', component: BusinessProfileMyComponent },
      { path: 'business-profile-settings', component: BusinessProfileSettingsComponent },
      { path: 'company-jobs', component: CompanyJobsMyComponent }
  ]},
  { path: 'candidate-profile-setting-test', loadChildren: () => import('./components/shared/emp-profile-settings-test/emp-profile-settings-test.module').then(m => m.EmpProfileSettingsTestModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
