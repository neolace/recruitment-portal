import {NgModule} from "@angular/core";
import {JobComponent} from "./job.component";
import {CommonModule} from "@angular/common";
import {JobRoutingModule} from "./job-routing.module";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";

@NgModule({
  declarations: [
    JobComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedPipesModule
  ]
})
export class JobModule { }
