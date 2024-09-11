import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {CommonModule} from "@angular/common";
import {RegisterRoutingModule} from "./register-routing.modules";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule
  ],
})
export class RegisterModule { }
