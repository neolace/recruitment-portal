import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechAndStartupRoutingModule } from './tech-and-startup-routing.module';
import { TechAndStartupComponent } from './tech-and-startup.component';


@NgModule({
  declarations: [
    TechAndStartupComponent
  ],
  imports: [
    CommonModule,
    TechAndStartupRoutingModule
  ]
})
export class TechAndStartupModule { }
