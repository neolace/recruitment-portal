import {NgModule} from "@angular/core";
import {JobPostComponent} from "./job-post.component";
import {CommonModule} from "@angular/common";
import {JobPostRoutingModule} from "./job-post-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    JobPostComponent
  ],
    imports: [
        CommonModule,
        JobPostRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class JobPostModule { }
