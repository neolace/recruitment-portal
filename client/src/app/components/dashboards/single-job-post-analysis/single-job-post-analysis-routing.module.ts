import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleJobPostAnalysisComponent } from './single-job-post-analysis.component';

const routes: Routes = [{ path: '', component: SingleJobPostAnalysisComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleJobPostAnalysisRoutingModule { }
