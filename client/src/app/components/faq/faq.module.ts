import {NgModule} from "@angular/core";
import {FaqComponent} from "./faq.component";
import {CommonModule} from "@angular/common";
import {FaqRoutingModule} from "./faq-routing.module";

@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule
  ],
  exports: []
})
export class FaqModule {}
