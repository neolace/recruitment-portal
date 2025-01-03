import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimittedOfferRoutingModule } from './limitted-offer-routing.module';
import { LimittedOfferComponent } from './limitted-offer.component';


@NgModule({
  declarations: [
    LimittedOfferComponent
  ],
  imports: [
    CommonModule,
    LimittedOfferRoutingModule
  ]
})
export class LimittedOfferModule { }
