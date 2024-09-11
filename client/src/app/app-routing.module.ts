import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) },
  { path: 'job', loadChildren: () => import('./components/job/job.module').then(m => m.JobModule) },
  { path: 'job-details/:id', loadChildren: () => import('./components/shared/job-details/job-details.module').then(m => m.JobDetailsModule) },
  { path: 'job-apply', loadChildren: () => import('./components/shared/job-apply/job-apply.module').then(m => m.JobApplyModule) },
  { path: 'job-post', loadChildren: () => import('./components/shared/job-post/job-post.module').then(m => m.JobPostModule) },
  { path: 'learn-more-jobs', loadChildren: () => import('./components/shared/jobs-learn-more/jobs-learn-more.module').then(m => m.JobsLearnMoreModule) },
  { path: 'companies', loadChildren: () => import('./components/companies/companies.module').then(m => m.CompaniesModule) },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) },
  { path: 'pricing', loadChildren: () => import('./components/prising/prising.module').then(m => m.PrisingModule) },
  { path: 'candidate-profile', loadChildren: () => import('./components/shared/emp-profile/emp-profile.module').then(m => m.EmpProfileModule) },
  { path: 'candidate-profile-setting', loadChildren: () => import('./components/shared/emp-profile-settings/emp-profile-settings.module').then(m => m.EmpProfileSettingsModule) },
  { path: 'my-jobs', loadChildren: () => import('./components/shared/emp-saved-jobs/emp-saved-jobs.module').then(m => m.EmpSavedJobsModule) },
  { path: 'business-profile/:id', loadChildren: () => import('./components/business-profile/business-profile.module').then(m => m.BusinessProfileModule) },
  { path: 'company-jobs/:id', loadChildren: () => import('./components/company-jobs/company-jobs.module').then(m => m.CompanyJobsModule) },
  { path: 'locked', loadChildren: () => import('./components/lock-screen/lock-screen.module').then(m => m.LockScreenModule) },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'reset', loadChildren: () => import('./components/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule) },
  { path: 'privacy-policy', loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'terms-and-conditions', loadChildren: () => import('./components/terms-conditions/terms-conditions.module').then(m => m.TermsConditionsModule) },
  { path: 'faq', loadChildren: () => import('./components/faq/faq.module').then(m => m.FaqModule) },
  { path: 'dashboard', loadChildren: () => import('./components/dashboards/free/free-dashboard/free-dashboard.module').then(m => m.FreeDashboardModule) },
  { path: 'pro', loadChildren: () => import('./components/dashboards/pro/pro-dashboard/pro-dashboard.module').then(m => m.ProDashboardModule) },
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
