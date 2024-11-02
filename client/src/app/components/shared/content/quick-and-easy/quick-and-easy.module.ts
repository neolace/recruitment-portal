import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickAndEasyRoutingModule } from './quick-and-easy-routing.module';
import { QuickAndEasyComponent } from './quick-and-easy.component';


@NgModule({
  declarations: [
    QuickAndEasyComponent
  ],
  imports: [
    CommonModule,
    QuickAndEasyRoutingModule
  ]
})
export class QuickAndEasyModule { }
