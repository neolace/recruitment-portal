import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FreeDashboardComponent } from './components/dashboards/free/free-dashboard/free-dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import { FreeMainDbComponent } from './components/dashboards/free/free-main-db/free-main-db.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { BusinessProfileSettingsComponent } from './components/dashboards/free/business-profile-settings/business-profile-settings.component';
import { BusinessProfileMyComponent } from './components/dashboards/free/business-profile-my/business-profile-my.component';
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
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { FaqComponent } from './components/faq/faq.component';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {SharedPipesModule} from "./shared/modules/shared-pipes.module";

@NgModule({
  declarations: [
    AppComponent,
    FreeDashboardComponent,
    FreeMainDbComponent,
    BusinessProfileSettingsComponent,
    BusinessProfileMyComponent,
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
    PrivacyPolicyComponent,
    TermsConditionsComponent,
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
        AngularFireAuthModule,
        SharedPipesModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
