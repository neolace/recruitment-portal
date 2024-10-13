import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    NgIf
  ],
  exports: [
  ]
})
export class SharedPaymentComponentsModule {}
