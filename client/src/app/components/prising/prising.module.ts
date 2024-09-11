import {NgModule} from "@angular/core";
import {PrisingComponent} from "./prising.component";
import {CommonModule} from "@angular/common";
import {PrisingRoutingModule} from "./prising-routing.module";

@NgModule({
  declarations: [
    PrisingComponent
  ],
  imports: [
    CommonModule,
    PrisingRoutingModule
  ],
  exports: []
})
export class PrisingModule {}
