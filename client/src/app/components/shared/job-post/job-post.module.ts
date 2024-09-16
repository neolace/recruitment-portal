import {NgModule} from "@angular/core";
import {JobPostComponent} from "./job-post.component";
import {CommonModule} from "@angular/common";
import {JobPostRoutingModule} from "./job-post-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../../shared/modules/shared-component.module";

@NgModule({
  declarations: [
    JobPostComponent
  ],
  imports: [
    CommonModule,
    JobPostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentModule
  ]
})
export class JobPostModule { }
