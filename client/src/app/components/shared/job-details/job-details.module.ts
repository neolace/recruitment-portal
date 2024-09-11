import {NgModule} from "@angular/core";
import {JobDetailsComponent} from "./job-details.component";
import {CommonModule} from "@angular/common";
import {JobDetailsRoutingModule} from "./job-details-routing.module";
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";

@NgModule({
  declarations: [
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    JobDetailsRoutingModule,
    SharedPipesModule
  ]
})
export class JobDetailsModule { }
