import {NgModule} from "@angular/core";
import {UnderDevelopmentComponent} from "../../components/shared/under-development/under-development.component";
import {FailedToLoadDataComponent} from "../../components/shared/failed-to-load-data/failed-to-load-data.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent
  ],
  imports: [
    RouterLink
  ],
  exports: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent
  ]
})
export class SharedComponentModule { }
