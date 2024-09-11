import {NgModule} from "@angular/core";
import {CompanyJobsComponent} from "./company-jobs.component";
import {CommonModule} from "@angular/common";
import {CompanyJobsRoutingModule} from "./company-jobs-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";

@NgModule({
  declarations: [
    CompanyJobsComponent
  ],
  imports: [
    CommonModule,
    CompanyJobsRoutingModule,
    SharedPipesModule
  ]
})
export class CompanyJobsModule { }
