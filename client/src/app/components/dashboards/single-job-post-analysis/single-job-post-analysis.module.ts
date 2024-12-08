import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleJobPostAnalysisRoutingModule } from './single-job-post-analysis-routing.module';
import { SingleJobPostAnalysisComponent } from './single-job-post-analysis.component';
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";
import {SharedChartsComponentModule} from "../../../shared/modules/shared-charts-component.module";
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";


@NgModule({
  declarations: [
    SingleJobPostAnalysisComponent
  ],
    imports: [
        CommonModule,
        SingleJobPostAnalysisRoutingModule,
        SharedComponentModule,
        SharedChartsComponentModule,
        SharedPipesModule
    ]
})
export class SingleJobPostAnalysisModule { }
