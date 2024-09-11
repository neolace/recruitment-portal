import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {EmpProfileComponent} from "./emp-profile.component";

const routes: Routes = [{path: '', component: EmpProfileComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpProfileRoutingModule { }
