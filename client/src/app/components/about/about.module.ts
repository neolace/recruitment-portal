import {NgModule} from "@angular/core";
import {AboutComponent} from "./about.component";
import {CommonModule} from "@angular/common";
import {AboutRoutingModule} from "./about-routing.module";
import {GoogleMapsModule} from "@angular/google-maps";

@NgModule({
  declarations: [
    AboutComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        GoogleMapsModule
    ]
})
export class AboutModule { }
