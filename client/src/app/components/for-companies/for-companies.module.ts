import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForCompaniesRoutingModule } from './for-companies-routing.module';
import { ForCompaniesComponent } from './for-companies.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";


@NgModule({
  declarations: [
    ForCompaniesComponent
  ],
    imports: [
        CommonModule,
        ForCompaniesRoutingModule,
        GoogleMapsModule,
        SharedPipesModule,
        SharedCardsComponentModule
    ]
})
export class ForCompaniesModule { }
