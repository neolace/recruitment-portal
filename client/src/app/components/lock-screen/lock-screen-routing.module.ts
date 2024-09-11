import {RouterModule, Routes} from "@angular/router";
import {LockScreenComponent} from "./lock-screen.component";
import {NgModule} from "@angular/core";

const routes: Routes = [{path: '', component: LockScreenComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockScreenRoutingModule {
}
