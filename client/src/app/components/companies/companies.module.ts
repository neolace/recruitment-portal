import {NgModule} from "@angular/core";
import {CompaniesComponent} from "./companies.component";
import {CommonModule} from "@angular/common";
import {CompaniesRoutingModule} from "./companies-routing.module";

@NgModule({
  declarations: [
    CompaniesComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule
  ],
  exports: []
})
export class CompaniesModule {}
