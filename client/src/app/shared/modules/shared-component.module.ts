import {NgModule} from "@angular/core";
import {UnderDevelopmentComponent} from "../../components/shared/under-development/under-development.component";
import {FailedToLoadDataComponent} from "../../components/shared/failed-to-load-data/failed-to-load-data.component";
import {RouterLink} from "@angular/router";
import {PageLoadingComponent} from "../../components/shared/page-loading/page-loading.component";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent
  ],
  imports: [
    RouterLink,
    NgIf
  ],
  exports: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent
  ]
})
export class SharedComponentModule { }
