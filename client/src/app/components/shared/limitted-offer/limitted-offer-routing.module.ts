import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimittedOfferComponent } from './limitted-offer.component';

const routes: Routes = [{ path: '', component: LimittedOfferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimittedOfferRoutingModule { }
