import {RouterModule, Routes} from "@angular/router";
import {PrisingComponent} from "./prising.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: PrisingComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrisingRoutingModule {}
