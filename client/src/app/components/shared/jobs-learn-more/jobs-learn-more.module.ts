import {NgModule} from "@angular/core";
import {JobsLearnMoreComponent} from "./jobs-learn-more.component";
import {CommonModule} from "@angular/common";
import {JobsLearnMoreRoutingModule} from "./jobs-learn-more-routing.module";
import {UnderDevelopmentComponent} from "../under-development/under-development.component";

@NgModule({
  declarations: [
    JobsLearnMoreComponent,
    UnderDevelopmentComponent
  ],
  imports: [
    CommonModule,
    JobsLearnMoreRoutingModule
  ],
  exports: []
})
export class JobsLearnMoreModule {}
