import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripeElementRoutingModule } from './stripe-element-routing.module';
import { StripeElementComponent } from './stripe-element.component';
import {StripeCardComponent} from "ngx-stripe";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StripeElementComponent
  ],
  imports: [
    CommonModule,
    StripeElementRoutingModule,
    StripeCardComponent,
    FormsModule
  ]
})
export class StripeElementModule { }
