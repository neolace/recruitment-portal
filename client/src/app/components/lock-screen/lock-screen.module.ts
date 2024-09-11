import {NgModule} from "@angular/core";
import {LockScreenComponent} from "./lock-screen.component";
import {CommonModule} from "@angular/common";
import {LockScreenRoutingModule} from "./lock-screen-routing.module";

@NgModule({
  declarations: [
    LockScreenComponent
  ],
  imports: [
    CommonModule,
    LockScreenRoutingModule
  ],
})
export class LockScreenModule { }
