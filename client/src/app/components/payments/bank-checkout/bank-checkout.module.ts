import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankCheckoutRoutingModule } from './bank-checkout-routing.module';
import { BankCheckoutComponent } from './bank-checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BankCheckoutComponent
  ],
    imports: [
        CommonModule,
        BankCheckoutRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class BankCheckoutModule { }
