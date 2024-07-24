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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
