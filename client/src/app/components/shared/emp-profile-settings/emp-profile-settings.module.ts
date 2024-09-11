import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EmpProfileSettingsRoutingModule} from "./emp-profile-settings-routing.module";
import {EmpProfileSettingsComponent} from "./emp-profile-settings.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EmpProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    EmpProfileSettingsRoutingModule,
    FormsModule
  ]
})
export class EmpProfileSettingsModule { }
