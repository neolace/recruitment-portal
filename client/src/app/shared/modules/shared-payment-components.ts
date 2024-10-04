import {NgModule} from "@angular/core";
import {CheckoutComponent} from "../../components/payment/checkout/checkout.component";
import {
  SubscriptionDetailsComponent
} from "../../components/payment/subscription-details/subscription-details.component";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
    CheckoutComponent,
    SubscriptionDetailsComponent
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    NgIf
  ],
  exports: [
    CheckoutComponent,
    SubscriptionDetailsComponent
  ]
})
export class SharedPaymentComponentsModule {}
