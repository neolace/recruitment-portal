import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardCheckoutComponent } from './card-checkout.component';

const routes: Routes = [{ path: '', component: CardCheckoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardCheckoutRoutingModule { }
