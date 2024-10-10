import {NgModule} from "@angular/core";
import {JobPostCard1Component} from "../../components/shared/cards/job-post-card1/job-post-card1.component";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SharedPipesModule} from "./shared-pipes.module";
import {JobPostCard2Component} from "../../components/shared/cards/job-post-card2/job-post-card2.component";

@NgModule({
  declarations: [
    JobPostCard1Component,
    JobPostCard2Component
  ],
  imports: [
    NgIf,
    RouterLink,
    SharedPipesModule,
    NgClass
  ],
  exports: [
    JobPostCard1Component,
    JobPostCard2Component
  ]
})
export class SharedCardsComponentModule {}
