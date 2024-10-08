import {NgModule} from "@angular/core";
import {PrisingComponent} from "./prising.component";
import {CommonModule} from "@angular/common";
import {PrisingRoutingModule} from "./prising-routing.module";
import {SharedPaymentComponentsModule} from "../../shared/modules/shared-payment-components";

@NgModule({
  declarations: [
    PrisingComponent
  ],
  imports: [
    CommonModule,
    PrisingRoutingModule,
    SharedPaymentComponentsModule
  ],
  exports: []
})
export class PrisingModule {}
