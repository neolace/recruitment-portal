import {NgModule} from "@angular/core";
import {JobDetailsComponent} from "./job-details.component";
import {CommonModule} from "@angular/common";
import {JobDetailsRoutingModule} from "./job-details-routing.module";
import {DateFormatPipe} from "../../../DTO/DateFormatPipe";

@NgModule({
  declarations: [
    JobDetailsComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    JobDetailsRoutingModule
  ]
})
export class JobDetailsModule { }
