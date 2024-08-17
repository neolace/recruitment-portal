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
import {BusinessProfileComponent} from "./components/dashboards/free/business-profile/business-profile.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'job', component: JobComponent },
  { path: 'job-details', component: JobDetailsComponent },
  { path: 'job-apply', component: JobApplyComponent },
  { path: 'job-post', component: JobPostComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'candidate-profile', component: EmpProfileComponent },
  { path: 'candidate-profile-setting', component: EmpProfileSettingsComponent },
  { path: 'locked', component: LockScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: FreeDashboardComponent, children: [
      { path: '', redirectTo: '/dashboard/overview', pathMatch: 'full' },
      { path: 'business-profile', component: BusinessProfileComponent },
      { path: 'overview', component: FreeMainDbComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
