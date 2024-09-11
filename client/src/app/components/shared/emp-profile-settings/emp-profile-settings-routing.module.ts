import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmpProfileSettingsComponent} from "./emp-profile-settings.component";

const routes: Routes = [{path: '', component: EmpProfileSettingsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpProfileSettingsRoutingModule { }
