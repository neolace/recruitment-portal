import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JobDetailsComponent} from './components/shared/job-details/job-details.component';
import {JobComponent} from './components/job/job.component';
import {JobApplyComponent} from './components/shared/job-apply/job-apply.component';
import {JobPostComponent} from './components/shared/job-post/job-post.component';
import {AboutComponent} from './components/about/about.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { ContactComponent } from './components/contact/contact.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { EmpProfileComponent } from './components/shared/emp-profile/emp-profile.component';
import { EmpProfileSettingsComponent } from './components/shared/emp-profile-settings/emp-profile-settings.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LockScreenComponent } from './components/lock-screen/lock-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobDetailsComponent,
    JobComponent,
    JobApplyComponent,
    JobPostComponent,
    AboutComponent,
    ContactComponent,
    EmpProfileComponent,
    EmpProfileSettingsComponent,
    LockScreenComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        GoogleMapsModule,
        MatMenuModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
