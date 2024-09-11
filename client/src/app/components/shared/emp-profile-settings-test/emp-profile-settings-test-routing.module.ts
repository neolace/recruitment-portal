import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpProfileSettingsTestComponent } from './emp-profile-settings-test.component';

const routes: Routes = [{ path: '', component: EmpProfileSettingsTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpProfileSettingsTestRoutingModule { }
