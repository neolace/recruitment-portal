import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreOrderRoutingModule } from './pre-order-routing.module';
import { PreOrderComponent } from './pre-order.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PreOrderComponent
  ],
    imports: [
        CommonModule,
        PreOrderRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PreOrderModule { }
