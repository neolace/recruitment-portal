import {NgModule} from "@angular/core";
import {PrisingComponent} from "./prising.component";
import {CommonModule} from "@angular/common";
import {PrisingRoutingModule} from "./prising-routing.module";
import {SharedPaymentComponentsModule} from "../../shared/modules/shared-payment-components";
import {SharedCardsComponentModule} from "../../shared/modules/shared-cards-component.module";

@NgModule({
  declarations: [
    PrisingComponent
  ],
    imports: [
        CommonModule,
        PrisingRoutingModule,
        SharedPaymentComponentsModule,
        SharedCardsComponentModule
    ],
  exports: []
})
export class PrisingModule {}
