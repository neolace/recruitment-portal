import {NgModule} from "@angular/core";
import {UnderDevelopmentComponent} from "../../components/shared/under-development/under-development.component";
import {FailedToLoadDataComponent} from "../../components/shared/failed-to-load-data/failed-to-load-data.component";
import {RouterLink} from "@angular/router";
import {PageLoadingComponent} from "../../components/shared/page-loading/page-loading.component";
import {NgIf} from "@angular/common";
import {ResultNotFoundComponent} from "../../components/shared/result-not-found/result-not-found.component";
import {NetworkErrorComponent} from "../../components/shared/network-error/network-error.component";
import {ForbiddenComponent} from "../../components/shared/forbidden/forbidden.component";

@NgModule({
  declarations: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent,
    ResultNotFoundComponent,
    NetworkErrorComponent,
    ForbiddenComponent
  ],
  imports: [
    RouterLink,
    NgIf
  ],
  exports: [
    UnderDevelopmentComponent,
    FailedToLoadDataComponent,
    PageLoadingComponent,
    ResultNotFoundComponent,
    NetworkErrorComponent,
    ForbiddenComponent
  ]
})
export class SharedComponentModule { }
