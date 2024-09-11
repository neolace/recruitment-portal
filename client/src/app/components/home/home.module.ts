import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {TimeAgoPipe} from "../../DTO/TimeAgoPipe";
import {TimeFormatPipe} from "../../DTO/TimeFormatPipe";
import {TruncateCommentsPipe} from "../../DTO/TruncateCommentsPipe";
import {TruncatePipe} from "../../DTO/TruncatePipe";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    TimeAgoPipe,
    TimeFormatPipe,
    TruncateCommentsPipe,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  providers: []
})
export class HomeModule { }
