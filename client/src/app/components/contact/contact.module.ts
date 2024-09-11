import {NgModule} from "@angular/core";
import {ContactComponent} from "./contact.component";
import {CommonModule} from "@angular/common";
import {ContactRoutingModule} from "./contact-routing.module";
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    GoogleMapsModule
  ],
  exports: []
})
export class ContactModule {}
