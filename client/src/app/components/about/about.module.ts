import {NgModule} from "@angular/core";
import {AboutComponent} from "./about.component";
import {CommonModule} from "@angular/common";
import {AboutRoutingModule} from "./about-routing.module";
import {GoogleMapsModule} from "@angular/google-maps";
import {SharedPipesModule} from "../../shared/modules/shared-pipes.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AboutComponent
  ],
    imports: [
        CommonModule,
        AboutRoutingModule,
        GoogleMapsModule,
        SharedPipesModule,
        ReactiveFormsModule
    ]
})
export class AboutModule { }
