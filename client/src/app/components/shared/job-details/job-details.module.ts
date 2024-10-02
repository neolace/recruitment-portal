import {NgModule} from "@angular/core";
import {JobDetailsComponent} from "./job-details.component";
import {CommonModule} from "@angular/common";
import {JobDetailsRoutingModule} from "./job-details-routing.module";
import {SharedPipesModule} from "../../../shared/modules/shared-pipes.module";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    JobDetailsComponent
  ],
    imports: [
        CommonModule,
        JobDetailsRoutingModule,
        SharedPipesModule,
        SharedComponentModule
    ]
})
export class JobDetailsModule { }
