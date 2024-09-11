import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpProfileSettingsTestRoutingModule } from './emp-profile-settings-test-routing.module';
import { EmpProfileSettingsTestComponent } from './emp-profile-settings-test.component';


@NgModule({
  declarations: [
    EmpProfileSettingsTestComponent
  ],
  imports: [
    CommonModule,
    EmpProfileSettingsTestRoutingModule
  ]
})
export class EmpProfileSettingsTestModule { }
