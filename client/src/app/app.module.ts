import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { JobDetailsComponent } from './components/shared/job-details/job-details.component';
import { JobComponent } from './components/job/job.component';
import { JobApplyComponent } from './components/shared/job-apply/job-apply.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JobDetailsComponent,
    JobComponent,
    JobApplyComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
