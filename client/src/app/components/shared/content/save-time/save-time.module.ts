import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveTimeRoutingModule } from './save-time-routing.module';
import { SaveTimeComponent } from './save-time.component';


@NgModule({
  declarations: [
    SaveTimeComponent
  ],
  imports: [
    CommonModule,
    SaveTimeRoutingModule
  ]
})
export class SaveTimeModule { }
