import {NgModule} from "@angular/core";
import {JobComponent} from "./job.component";
import {CommonModule} from "@angular/common";
import {JobRoutingModule} from "./job-routing.module";
import {TimeAgoPipe} from "../../DTO/TimeAgoPipe";

@NgModule({
  declarations: [
    JobComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    JobRoutingModule
  ]
})
export class JobModule { }
