import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JobPostComponent} from './components/shared/job-post/job-post.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { ContactComponent } from './components/contact/contact.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LockScreenComponent } from './components/lock-screen/lock-screen.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { FreeDashboardComponent } from './components/dashboards/free/free-dashboard/free-dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import { FreeMainDbComponent } from './components/dashboards/free/free-main-db/free-main-db.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { BusinessProfileComponent } from './components/business-profile/business-profile.component';
import { BusinessProfileSettingsComponent } from './components/dashboards/free/business-profile-settings/business-profile-settings.component';
import { BusinessProfileMyComponent } from './components/dashboards/free/business-profile-my/business-profile-my.component';
import { PrisingComponent } from './components/prising/prising.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CompanyJobsComponent } from './components/company-jobs/company-jobs.component';
import { CompanyJobsMyComponent } from './components/dashboards/free/company-jobs-my/company-jobs-my.component';
import { ProDashboardComponent } from './components/dashboards/pro/pro-dashboard/pro-dashboard.component';
import { ProMainDbComponent } from './components/dashboards/pro/pro-main-db/pro-main-db.component';
import { EmpSavedJobsComponent } from './components/shared/emp-saved-jobs/emp-saved-jobs.component';
import { EmpSavedJobsSavedComponent } from './components/shared/emp-saved-jobs/emp-saved-jobs-saved/emp-saved-jobs-saved.component';
import { EmpSavedJobsInprogressComponent } from './components/shared/emp-saved-jobs/emp-saved-jobs-inprogress/emp-saved-jobs-inprogress.component';
import { EmpSavedJobsAppliedComponent } from './components/shared/emp-saved-jobs/emp-saved-jobs-applied/emp-saved-jobs-applied.component';
import { EmpSavedJobsArchivedComponent } from './components/shared/emp-saved-jobs/emp-saved-jobs-archived/emp-saved-jobs-archived.component';
import { PersonalProfileMyComponent } from './components/dashboards/free/personal-profile-my/personal-profile-my.component';
import { PersonalProfileSettingsComponent } from './components/dashboards/free/personal-profile-settings/personal-profile-settings.component';

import { DateFormatPipe } from "./DTO/DateFormatPipe";
import { HourMinuteFormatPipe } from "./DTO/HourMinuteFormatPipe";
import { RoundFloats } from "./DTO/RoundFloats";
import { TimeAgoPipe } from "./DTO/TimeAgoPipe";
import { TimeFormatPipe } from "./DTO/TimeFormatPipe";
import { TruncateCommentsPipe } from "./DTO/TruncateCommentsPipe";
import { TruncatePipe } from "./DTO/TruncatePipe";
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { JobsLearnMoreComponent } from './components/shared/jobs-learn-more/jobs-learn-more.component';
import { UnderDevelopmentComponent } from './components/shared/under-development/under-development.component';
import { FaqComponent } from './components/faq/faq.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    JobPostComponent,
    ContactComponent,
    LockScreenComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    FreeDashboardComponent,
    FreeMainDbComponent,
    BusinessProfileComponent,
    BusinessProfileSettingsComponent,
    BusinessProfileMyComponent,
    PrisingComponent,
    CompaniesComponent,
    CompanyJobsComponent,
    CompanyJobsMyComponent,
    ProDashboardComponent,
    ProMainDbComponent,
    EmpSavedJobsComponent,
    EmpSavedJobsSavedComponent,
    EmpSavedJobsInprogressComponent,
    EmpSavedJobsAppliedComponent,
    EmpSavedJobsArchivedComponent,
    PersonalProfileMyComponent,
    PersonalProfileSettingsComponent,
    DateFormatPipe,
    HourMinuteFormatPipe,
    RoundFloats,
    TimeAgoPipe,
    TimeFormatPipe,
    TruncateCommentsPipe,
    TruncatePipe,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    JobsLearnMoreComponent,
    UnderDevelopmentComponent,
    FaqComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        GoogleMapsModule,
        MatMenuModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
