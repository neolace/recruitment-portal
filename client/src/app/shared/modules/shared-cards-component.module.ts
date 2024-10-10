import {NgModule} from "@angular/core";
import {JobPostCard1Component} from "../../components/shared/cards/job-post-card1/job-post-card1.component";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SharedPipesModule} from "./shared-pipes.module";

@NgModule({
  declarations: [
    JobPostCard1Component
  ],
  imports: [
    NgIf,
    RouterLink,
    SharedPipesModule,
    NgClass
  ],
  exports: [
    JobPostCard1Component
  ]
})
export class SharedCardsComponentModule {}
