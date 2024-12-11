import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardCheckoutRoutingModule } from './card-checkout-routing.module';
import { CardCheckoutComponent } from './card-checkout.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CardCheckoutComponent
  ],
    imports: [
        CommonModule,
        CardCheckoutRoutingModule,
        ReactiveFormsModule
    ]
})
export class CardCheckoutModule { }
