import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LimittedOfferRoutingModule } from './limitted-offer-routing.module';
import { LimittedOfferComponent } from './limitted-offer.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LimittedOfferComponent
  ],
    imports: [
        CommonModule,
        LimittedOfferRoutingModule,
        ReactiveFormsModule
    ]
})
export class LimittedOfferModule { }
